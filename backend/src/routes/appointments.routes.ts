import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";

const router = Router();
const controller = new AppointmentController();

// POST /v1/appointments
router.post("/", controller.create);

// GET /v1/appointments
router.get("/", controller.list);

export { router as appointmentRoutes };
