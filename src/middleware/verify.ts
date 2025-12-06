import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const verify = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const tokenBearer = req.headers.authorization;
    const token = tokenBearer?.split(" ")[1];
    try {
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized invalid token",
        });
      }
      const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;
      const user = await pool.query(
        `
      SELECT * FROM users WHERE email=$1
      `,
        [decoded.email]
      );
      if (user.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized invalid token",
        });
      }
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default verify;
