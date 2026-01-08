import { Router } from "express";
import { AppointmentController } from "./controllers/AppointmentController";

const routes = Router();
const appointmentController = new AppointmentController();

routes.post("/appointments", appointmentController.create);
routes.get("/appointments", appointmentController.list);

export { routes };
