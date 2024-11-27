import { User } from "./user.interface";

export interface LoginReqI {
  email: string;
  password: string;
}

export interface LoginResI {
  data: {
    user: User;
    token: string;
  };
  success: boolean;
}
