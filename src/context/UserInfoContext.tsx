import { createContext } from "react";

export type User = {
  email: string;
  name: string;
  authToken: string;
};

type UserInfoContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined
);
