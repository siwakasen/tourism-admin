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

export interface ResetPasswordReqI {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResI {
  success: boolean;
  message: string;
}
