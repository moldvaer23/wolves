import pool from "../db";

export type User = {
  id: number;
  username: string;
  email: string;
};

/* Получение пользователя по ID */
export const getUserById = async (id: number): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [id];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  return {
    id: result.rows[0].id,
    username: result.rows[0].username,
    email: result.rows[0].email,
  };
};
