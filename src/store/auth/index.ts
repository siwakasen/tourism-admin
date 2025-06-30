import { createSlice } from "@reduxjs/toolkit";
import { LoginResI } from "../../__interface/auth.interface";

export interface ProfileI {
  id: string;
  email: string;
  username: string;
  qatarID: string;
  createdAt?: Date;
  verifiedAt?: Date;
  updatedAt?: Date;
}

export interface AuthStateI {
  loading: boolean;
  accessToken?: string;
  expiresAt?: number;
  error?: string;
  success: boolean;
}

const initialState: AuthStateI = {
  loading: false,
  accessToken: undefined,
  expiresAt: undefined,
  error: undefined,
  success: false,
};

type LoginInfoPayload = {
  payload: LoginResI;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokenAuth: (state: AuthStateI, { payload }: LoginInfoPayload) => {
      state.accessToken = payload.data.token;
    },
    deleteTokenAuth: (state) => {
      state.accessToken = undefined;
    },
  },
});

export const { saveTokenAuth, deleteTokenAuth } = authSlice.actions;

export default authSlice.reducer;
