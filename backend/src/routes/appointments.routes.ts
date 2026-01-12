import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();
const controller = new AppointmentController();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /v1/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Appointment created
 *       400:
 *         description: Validation error
 */
router.post("/", ensureAuthenticated, controller.create);

/**
 * @swagger
 * /v1/appointments:
 *   get:
 *     summary: List appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 */
router.get("/", ensureAuthenticated, controller.list);

export { router as appointmentRoutes };
