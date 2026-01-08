import { z } from "zod";

export const createAppointmentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),

  phone: z.string().min(10, "Telefone inválido"),

  date: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Data inválida",
  }),
});
