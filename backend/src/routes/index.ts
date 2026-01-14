import { Router } from "express";
import { appointmentRoutes } from "./appointments.routes";
import { authRoutes } from "./auth.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

// versionamento aqui
routes.use("/users", usersRoutes);
routes.use("/appointments", appointmentRoutes);
routes.use(authRoutes);

export { routes };
