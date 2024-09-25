import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { JWTData } from "../types";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Функция для создания JWT токена
 */
export const createJWTToken = (props: JWTData): string => {
  return jwt.sign(props, JWT_SECRET, { expiresIn: "1h" });
};
