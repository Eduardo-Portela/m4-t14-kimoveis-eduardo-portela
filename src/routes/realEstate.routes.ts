import { Router } from "express";
import {
  createRealEstateControllers,
  getAllRealEstatesControllers,
} from "../controllers";
import {
  verifyDataIsValidMiddleware,
  verifyTokenIsValidMiddleware,
  verifyUserIsAdminMiddleware,
} from "../middlewares";
import { createRealEstateSchema } from "../schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  verifyTokenIsValidMiddleware,
  verifyUserIsAdminMiddleware,
  verifyDataIsValidMiddleware(createRealEstateSchema),
  createRealEstateControllers
);

realEstateRoutes.get("", getAllRealEstatesControllers);

export { realEstateRoutes };
