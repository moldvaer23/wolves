import { query } from "../db";
import { CreateChatProps, SendMessageProps } from "../types";

/**
 *  Контроллер создания чата
 */
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

/**
 * Контроллер получения чатов по id пользователя
 */
export const getChatsByUserId = async (userId: number) => {
  /* Запрашиваем все чаты в которых состоит пользователь */
  const userChats = await query(
    "SELECT * FROM users_chats WHERE user_id = $1",
    [userId]
  );

  /* Создаем массив с id чатов */
  const chatsId = userChats.rows.map((chat) => chat.chat_id);

  /* Запрашиваем все чаты */
  const chats = await query(
    "SELECT * FROM chats WHERE id = ANY($1) ORDER BY created_at ASC",
    [chatsId]
  );

  return chats;
};

/**
 * Контроллер отправки сообщения по id чата
 */
export const getMessagesByChatId = async (chatId: number) => {
  /* Загружаем последние сообщения из БД для этого чата */
  const messages = await query(
    "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC",
    [chatId]
  );

  return messages;
};

/**
 * Контроллер отправки сообщения
 */
export const sendMessage = async (props: SendMessageProps) => {
  const { chatId, senderId, text } = props;

  /* Сохраняем сообщение в БД */
  const result = await query(
    "INSERT INTO messages (chat_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *",
    [chatId, senderId, text]
  );

  return result.rows[0];
};
