import { Router } from "express";
import { appointmentRoutes } from "./appointments.routes";
import { authRoutes } from "./auth.routes";

const routes = Router();

// versionamento aqui
routes.use("/v1/appointments", appointmentRoutes);
routes.use("/v1", authRoutes);

export { routes };
