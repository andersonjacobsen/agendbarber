import { prisma } from "../lib/prisma";
import { AppError } from "../errors/AppError";
import { validateAppointmentDate } from "../utils/validateAppointmentDate";

export class CreateAppointmentService {
  async execute({ name, phone, date }: any) {
    validateAppointmentDate(date);

    const appointmentExists = await prisma.appointment.findFirst({
      where: { date },
    });

    if (appointmentExists) {
      throw new AppError("Horário já agendado", 409);
    }

    return prisma.appointment.create({
      data: { name, phone, date },
    });
  }
}
