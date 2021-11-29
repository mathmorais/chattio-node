import { NextFunction, Request, Response } from "express";
import { handleVerifyToken } from "../utils/handleVerifyToken";

export const checkIsAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const [prefix, token] = req.headers.authorization.split(" ");

    if (token) {
      try {
        handleVerifyToken(token);
        next();
      } catch (err) {
        res.status(401).json({ code: "error.unathorized" });
      }
    }
  }
};
