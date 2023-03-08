import { Router } from "express";
import {
  createCategoryController,
  getAllCategories,
  getRealEstateByCategoryController,
} from "../controllers";
import {
  verifyDataIsValidMiddleware,
  verifyTokenIsValidMiddleware,
  verifyUserIsAdminMiddleware,
} from "../middlewares";
import { createCategorySchema } from "../schemas";

const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  verifyTokenIsValidMiddleware,
  verifyUserIsAdminMiddleware,
  verifyDataIsValidMiddleware(createCategorySchema),
  createCategoryController
);

categoryRoutes.get("", getAllCategories);

categoryRoutes.get("/:id/realEstate", getRealEstateByCategoryController);

export { categoryRoutes };
