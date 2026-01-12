import { Router } from "express";
import { appointmentRoutes } from "./appointments.routes";
import { authRoutes } from "./auth.routes";

const routes = Router();

// versionamento aqui
routes.use("/appointments", appointmentRoutes);
routes.use(authRoutes);

export { routes };
