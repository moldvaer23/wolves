import dotenv from "dotenv";
dotenv.config();

import { DefaultEventsMap, ExtendedError, Socket } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyJWT = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) => {
  const token = socket.handshake.headers.token as string | undefined;

  if (!token) {
    return next(new Error("Authentication error: Token not provided")); // Токен отсутствует
  }

  /* Проверяем токен */
  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      return next(new Error("Authentication error: Invalid token")); // Токен недействителен
    }

    next();
  });
};
