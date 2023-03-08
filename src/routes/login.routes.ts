import { Router } from "express";
import { createLoginController } from "../controllers";
import { verifyDataIsValidMiddleware } from "../middlewares";
import { createLoginSchema } from "../schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  verifyDataIsValidMiddleware(createLoginSchema),
  createLoginController
);

export { loginRoutes };
