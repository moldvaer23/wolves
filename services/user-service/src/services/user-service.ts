import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { RegistrationUserProps, User } from "../types";
import { createUser, findUserByEmail, getUserById } from "../models/user-model";

const JWT_SECRET = process.env.JWT_SECRET as string;

/* Сервис регистрации пользователя */
const registrationUser = async (props: RegistrationUserProps) => {
  const { email, password, username } = props;

  try {
    /* Проверяем, существует ли пользователь */
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    /* Хэшируем пароль */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Создаем пользователя в базе данных */
    const newUser = await createUser({
      email: email,
      password: hashedPassword,
      username: username,
    });

    /* Генерируем JWT токен */
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { token, user: newUser };
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error registration user: ${errorMessage}`);
  }
};

/* Сервис для получения пользователя по ID */
const fetchUserById = async (id: number): Promise<User> => {
  try {
    const user = await getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error fetching user: ${errorMessage}`);
  }
};

export default {
  registrationUser,
  fetchUserById,
};
