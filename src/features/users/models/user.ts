export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  category: string;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
};
