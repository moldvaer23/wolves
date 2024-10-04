import { DefaultEventsMap, Socket } from "socket.io";
import { query } from "../db";

type ControllerProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
};

type CreateChatProps = ControllerProps & {
  chatName: string;
  participants: number[];
};

export const createChat = async (props: CreateChatProps) => {
  const { chatName, participants } = props;

  /* Создаем чат */
  const chat = await query(
    "INSERT INTO chats (name) VALUES ($1) RETURNING id",
    [chatName]
  );

  const chatId = chat.rows[0].id;

  /* Генерирует запрос на добавление все пользователь в этот чат */
  const values = participants
    .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
    .join(", ");

  const params: number[] = [];

  participants.forEach((userId) => {
    params.push(userId, chatId);
  });

  /* Выполняем запрос на добавление всех пользователей в новый чат */
  const queryText = `INSERT INTO users_chats (user_id, chat_id) VALUES ${values}`;
  await query(queryText, params);
};
