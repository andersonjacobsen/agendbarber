import express from "express";
import cors from "cors";
import "express-async-errors";
import { routes } from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(3333, () => {
  console.log("🚀 Server running on http://localhost:3333");
});
