import dotenv from "dotenv";
import express from "express";
import axios, { AxiosError } from "axios";

import { APP_CONFIG } from "./config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || APP_CONFIG.servicePort;

app.use(express.json());

/* Маршрутизация запросов к микросервису User */
app.use(`${APP_CONFIG.apiPath}/user`, async (req, res) => {
  const { method, url } = req;

  try {
    const response = await axios({
      method: method,
      url: `${process.env.SERVICE_USER_URL}${url}`,
      data: req.body,
      headers: APP_CONFIG.axiosHeaders,
      timeout: APP_CONFIG.axiosTimeOut,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    const error = err as AxiosError;
    res.status(error.status || 500).json(error.response?.data);
  }
});

/* Запуск сервера */
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
