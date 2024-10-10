import dotenv from "dotenv";
dotenv.config();

import http from "http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";

import { APP_CONFIG } from "./config";
import { verifyJWT } from "./middlewares";
import {
  createChat,
  getChatsByUserId,
  getMessagesByChatId,
  sendMessage,
} from "./controllers";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || APP_CONFIG.servicePort;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

/* Подключаем middleware проверки токена */
io.use(verifyJWT);

/* WebSocket логика */
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  /* Создание чата */
  socket.on("createChat", async (props) => {
    createChat(props);
  });

  /* Поиск чатов по id пользователя */
  socket.on("chats", async (userId) => {
    const chats = await getChatsByUserId(userId);

    socket.emit("loadChats", chats.rows);
  });

  /* Присоединяем пользователя к чату */
  socket.on("joinChat", async (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);

    const messages = await getMessagesByChatId(chatId);

    socket.emit("loadMessages", messages.rows);
  });

  /* Обрабатываем отправку сообщения */
  socket.on("message", async (props) => {
    const message = await sendMessage(props);

    io.to(props.chatId).emit("message", message); // Отправляем сообщение всем пользователям в чате
  });

  /* Отключение */
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

/* Запуск сервера */
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
