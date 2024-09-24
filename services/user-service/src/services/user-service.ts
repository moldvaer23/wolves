import { User, getUserById } from "../models/user-model";

/* Сервис для получения пользователя по ID */
const fetchUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await getUserById(id);

    if (!user) {
      throw new Error(`User not found: ${id}`);
    }

    return user;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error(`Error fetching user: ${errorMessage}`);
  }
};

export default {
  fetchUserById,
};
