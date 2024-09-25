export type User = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
};

export type RegistrationUserProps = {
  username: string;
  email: string;
  password: string;
};
