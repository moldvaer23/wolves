export type JWTData = {
  id: number;
  email: string;
  username: string;
};

export type CreateChatProps = {
  chatName: string;
  participants: number[];
};

export type SendMessageProps = {
  chatId: number;
  senderId: number;
  text: string;
};
