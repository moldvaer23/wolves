import pool from "../db";
import { RegistrationUserProps, User } from "../types";

/* Создание нового пользователя */
export const createUser = async (
  props: RegistrationUserProps
): Promise<User> => {
  const query = `
    INSERT INTO users (email, username, password_hash, created_at, updated_at)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *;
  `;
  const { email, password, username } = props;
  const values = [email, username, password];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error when creating a user: ${errorMessage}`);
  }
};

/* Поиск пользователя по email */
export const getUserByEmail = async (email: string): Promise<User> => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(
      `Error when searching for a user by email: ${errorMessage}`
    );
  }
};

/* Получение пользователя по ID */
export const getUserById = async (id: number): Promise<User> => {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error when trying to get a user by id: ${errorMessage}`);
  }
};
