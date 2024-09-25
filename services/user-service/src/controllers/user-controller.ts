import { Request, Response } from "express";

import userService from "../services/user-service";

/* Контроллер регистрации пользователя */
export const registration = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const { token, user } = await userService.registrationUser({
      email,
      password,
      username,
    });

    res.status(201).json({
      message: "The user has been successfully registered",
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(400).json({ message: errorMessage });
  }
};

/* Контроллер для получения пользователя по ID */
export const getUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  try {
    const user = await userService.fetchUserById(userId);
    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(404).json({ message: errorMessage });
  }
};
