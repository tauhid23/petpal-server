export type PUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserCreateInput = Omit<PUser, "id" | "createdAt" | "updatedAt">;