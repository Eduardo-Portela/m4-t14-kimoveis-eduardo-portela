import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  edituserController,
  getAllUsersController,
} from "../controllers";
import {
  verifyDataIsValidMiddleware,
  verifyTokenIsValidMiddleware,
  verifyUserExistsByIdMiddleware,
  verifyUserIsAdminMiddleware,
} from "../middlewares";
import { userSchema, userUpdateSchema } from "../schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyDataIsValidMiddleware(userSchema),
  createUserController
);

userRoutes.get(
  "",
  verifyTokenIsValidMiddleware,
  verifyUserIsAdminMiddleware,
  getAllUsersController
);

userRoutes.patch(
  "/:id",
  verifyTokenIsValidMiddleware,
  verifyUserExistsByIdMiddleware,
  verifyDataIsValidMiddleware(userUpdateSchema),
  edituserController
);

userRoutes.delete(
  "/:id",
  verifyTokenIsValidMiddleware,
  verifyUserExistsByIdMiddleware,
  verifyUserIsAdminMiddleware,
  deleteUserController
);

export { userRoutes };
