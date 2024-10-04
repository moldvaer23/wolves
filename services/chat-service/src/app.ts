import dotenv from "dotenv";
dotenv.config();

import http from "http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import { query } from "./db";
import { APP_CONFIG } from "./config";
import { createChat } from "./controllers/chat-controler";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || APP_CONFIG.servicePort;
const JWT_SECRET = process.env.JWT_SECRET as string;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "*", // Разрешаем запросы со всех источников, можно указать конкретный URL
    methods: ["GET", "POST"], // Разрешённые методы
  })
);

io.use((socket, next) => {
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
});

/* WebSocket логика */
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("createChat", async (props) => {
createChat(props)

  });

  socket.on("chats", async (userId) => {
    /* Запрашиваем все чаты в которых состоит пользователь */
    const userChats = await query(
      "SELECT * FROM users_chats WHERE user_id = $1",
      [userId]
    );

    /* Создаем массив с id чатов */
    const chatsId = userChats.rows.map((chat) => chat.chat_id);

    /* Запрашиваем все чаты */
    const chats = await query(
      "SELECT * FROM chats WHERE id = ANY($1) ORDER BY created_at ASC",
      [chatsId]
    );

    socket.emit("loadChats", chats.rows);
  });

  /* Присоединяем пользователя к чату */
  socket.on("joinChat", async (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);

    /* Загружаем последние сообщения из БД для этого чата */
    const messages = await query(
      "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC",
      [chatId]
    );

    /* Отправляем сообщения клиенту */
    socket.emit("loadMessages", messages.rows);
  });

  /* Обрабатываем отправку сообщения */
  socket.on("message", async ({ chatId, senderId, text }) => {
    /* Сохраняем сообщение в БД */
    const result = await query(
      "INSERT INTO messages (chat_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *",
      [chatId, senderId, text]
    );

    const message = result.rows[0];

    /* Отправляем сообщение всем пользователям в чате */
    io.to(chatId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

/* Запуск сервера */
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
