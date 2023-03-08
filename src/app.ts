import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import {
  loginRoutes,
  realEstateRoutes,
  scheduleRoutes,
  userRoutes,
} from "./routes";
import { categoryRoutes } from "./routes/category.routes";

const app: Application = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoryRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", scheduleRoutes);

app.use(handleErrors);

export default app;
