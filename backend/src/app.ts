import express from "express";
import cors from "cors";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);
