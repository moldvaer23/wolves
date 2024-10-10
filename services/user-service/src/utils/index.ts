import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { JWTData } from "../types";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

/**
 * Функция для создания JWT токена
 */
export const createJWTToken = (props: JWTData): string => {
  return jwt.sign(props, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
