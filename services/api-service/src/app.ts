import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const rootPath = "/api";

const rootHeaders = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

/* Маршрутизация запросов к микросервису User */
app.use(`${rootPath}/user`, async (req, res) => {
  const { method, url } = req;

  const userServiceUrl = `${process.env.SERVICE_USER_URL}${url}`;

  try {
    const response = await axios({
      method: method,
      url: userServiceUrl,
      data: req.body,
      headers: {
        ...req.headers,
        ...rootHeaders,
      },
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});

/* Запуск сервера */
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
