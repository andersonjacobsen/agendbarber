import { AppError } from "../errors/AppError";

export function validateAppointmentDate(date: Date) {
  const appointmentDate = new Date(date);
  const now = new Date();

  if (appointmentDate <= now) {
    throw new AppError("Não é possível agendar no passado", 400);
  }

  const hour = appointmentDate.getHours();
  const minutes = appointmentDate.getMinutes();

  if (minutes !== 0) {
    throw new AppError("Agendamentos devem ser feitos em horas cheias", 400);
  }

  if (hour < 8 || hour > 18) {
    throw new AppError("Horário fora do expediente", 400);
  }
}
