import express from "express";
import dotenv from "dotenv";

import { getUser } from "./controllers/user-controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

/* Маршруты */
app.get("/:id", getUser);

/* Запуск сервера */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
