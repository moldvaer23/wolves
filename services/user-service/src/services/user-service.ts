import bcrypt from "bcryptjs";

import { createJWTToken } from "../utils";
import { LoginUserProps, RegistrationUserProps, User } from "../types";
import { createUser, getUserByEmail, getUserById } from "../models/user-model";

/* Сервис регистрации пользователя */
const registrationUser = async (
  props: RegistrationUserProps
): Promise<{ token: string; user: User }> => {
  const { email, password, username } = props;

  try {
    /* Проверяем, существует ли пользователь */
    const existingUser = await getUserByEmail(email);
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
    const token = createJWTToken({
      email: newUser.email,
      id: newUser.id,
      username: newUser.username,
    });

    return { token: token, user: newUser };
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error registration user: ${errorMessage}`);
  }
};

/* Сервис авторизации пользователя */
const loginUser = async (
  props: LoginUserProps
): Promise<{ token: string; user: User }> => {
  const { email, password } = props;

  try {
    /* Ищем пользователя по email */
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    /* Сравниваем введеный пароль с хешированным паролем */
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    /* Создаем JWT токен */
    const token = createJWTToken({
      email: user.email,
      id: user.id,
      username: user.username,
    });

    return { token, user };
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error login user: ${errorMessage}`);
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
  loginUser,
  fetchUserById,
};
