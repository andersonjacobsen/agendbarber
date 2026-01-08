import { z } from "zod";
import { normalizePhone } from "../utils/normalizePhone";

export const createAppointmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),

  phone: z
    .string()
    .transform(normalizePhone)
    .refine((value) => value.length >= 10, {
      message: "Telefone inválido",
    }),

  date: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Data inválida",
  }),
});
