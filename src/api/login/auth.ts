import { api } from "@/libs/axios";

const LOGIN = "/login";

type LoginRequest = {
  email: string;
  password: string;
};

export const login = (payload: LoginRequest) => {
  return api.post(LOGIN, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
