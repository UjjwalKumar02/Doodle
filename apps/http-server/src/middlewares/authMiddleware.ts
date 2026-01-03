import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("authorization");

  if (!token) return res.status(400).json({ error: "Token not found" });

  // @ts-ignore
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

  // Token vaidation checks
  if (typeof decoded == "string") {
    return res.status(400).json({ error: "Invalid token" });
  }

  if (!decoded || !decoded.id) {
    return res.status(400).json({ error: "Invalid token" });
  }

  req.userId = decoded.id;
  next();
}
