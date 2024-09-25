import dotenv from "dotenv";
import express from "express";
dotenv.config();

import { APP_CONFIG } from "./config";
import { getUser, registration } from "./controllers/user-controller";

const app = express();
const PORT = process.env.PORT || APP_CONFIG.servicePort;

app.use(express.json());

/* Маршруты */
app.get("/:id", getUser);
app.post("/registration", registration);

/* Запуск сервера */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
