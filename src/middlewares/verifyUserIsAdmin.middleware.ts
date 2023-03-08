import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verifyUserIsAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isAdmin: boolean = req.user.admin;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { verifyUserIsAdminMiddleware };
