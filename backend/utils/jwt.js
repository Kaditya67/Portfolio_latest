import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signToken = (payload, expiresIn = "7d") =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn });

export const verifyToken = (token) =>
  jwt.verify(token, env.JWT_SECRET);