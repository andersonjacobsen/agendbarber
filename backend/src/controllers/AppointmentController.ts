import { Request, Response } from "express";
import { createAppointmentSchema } from "../schemas/createAppointmentSchema";
import { CreateAppointmentService } from "../services/CreateAppointmentService";
import { prisma } from "../lib/prisma";
import { success } from "../utils/apiResponse";

export class AppointmentController {
  create = async (req: Request, res: Response) => {
    const data = createAppointmentSchema.parse(req.body);

    const service = new CreateAppointmentService();
    const appointment = await service.execute(data);

    return res.status(201).json(success(appointment));
  };

  list = async (_: Request, res: Response) => {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return res.json(success(appointments));
  };
}
