
export interface LoginReqI {
  email: string;
  password: string;
}

export interface LoginResI {
  data: {
    message: string;
    token: string;
  };
  success: boolean;
}

export interface ResetPasswordReqI {
  token: string;
  password: string;
}

export interface ResetPasswordResI {
  success: boolean;
  message: string;
}

export interface RequestResetPasswordReqI {
  email: string;
}

export interface RequestResetPasswordResI {
  message: string;
}
