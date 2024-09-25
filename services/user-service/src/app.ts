import dotenv from "dotenv";
import express from "express";
dotenv.config();

import { APP_CONFIG } from "./config";
import { authenticateToken } from "./middlewares/user-middlewares";
import { getUser, login, registration } from "./controllers/user-controller";

const app = express();
const PORT = process.env.PORT || APP_CONFIG.servicePort;

app.use(express.json());

/* Открытые маршруты */
app.post("/registration", registration);
app.post("/login", login);

/* Закрытые маршруты */
app.get("/:id", authenticateToken, getUser);

/* Запуск сервера */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
