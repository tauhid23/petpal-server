import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// Extend Express Request type globally
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(400).json({ message: "Invalid authorization header format" });
  }

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  // JWT_SECRET exists and cast it to Secret
  const secret: Secret = process.env.JWT_SECRET!;
  if (!secret) {
    return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // string | JwtPayload
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
