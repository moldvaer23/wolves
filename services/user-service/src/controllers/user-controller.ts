import { Request, Response } from "express";
import userService from "../services/user-service";

/* Контроллер для получения пользователя по ID */
export const getUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  try {
    const user = await userService.fetchUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(404).json({ message: errorMessage });
  }
};
