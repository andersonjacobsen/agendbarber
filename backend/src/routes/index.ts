import { Router } from "express";
import { appointmentRoutes } from "./appointments.routes";

const routes = Router();

// versionamento aqui
routes.use("/v1/appointments", appointmentRoutes);

export { routes };
