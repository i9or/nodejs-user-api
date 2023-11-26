export type UserRole = "USER" | "ADMIN";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  accessToken: string;
};
