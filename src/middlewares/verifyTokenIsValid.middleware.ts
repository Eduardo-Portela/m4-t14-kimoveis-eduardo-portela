import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import Jwt from "jsonwebtoken";
import "dotenv/config";

const verifyTokenIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  let token: string | undefined = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  Jwt.verify(token, process.env.SECRET_KEY!, (err, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    req.user = {
      id: Number(decoded.sub),
      admin: decoded.admin,
      deletedAt: decoded.deleteAt,
    };

    return next();
  });
};

export { verifyTokenIsValidMiddleware };
