import { Router } from "express";
import {
  createSchedulesControllers,
  getSchedulesRealEstateById,
} from "../controllers";
import {
  verifyDataIsValidMiddleware,
  verifyTokenIsValidMiddleware,
  verifyUserIsAdminMiddleware,
} from "../middlewares";
import { createScheduleSchema } from "../schemas";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  verifyTokenIsValidMiddleware,
  verifyDataIsValidMiddleware(createScheduleSchema),
  createSchedulesControllers
);

scheduleRoutes.get(
  "/realEstate/:id",
  verifyTokenIsValidMiddleware,
  verifyUserIsAdminMiddleware,
  getSchedulesRealEstateById
);

export { scheduleRoutes };
