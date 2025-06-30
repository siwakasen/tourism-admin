import {
  LoginReqI,
  LoginResI,
  RequestResetPasswordReqI,
  RequestResetPasswordResI,
  ResetPasswordReqI,
  ResetPasswordResI,
} from "../../__interface/auth.interface";
import {} from "../../__interface/travel_package.interface";
import { VITE_APP_REST_AUTH } from "../../_constants/constant";

import { Api } from "./api";

export const AuthApi = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query(body) {
        return {
          url: `${VITE_APP_REST_AUTH}/employees/login`,
          method: "POST",
          body,
        };
      },
    }),
    requestResetPassword: build.mutation<
      RequestResetPasswordResI,
      RequestResetPasswordReqI
    >({
      query(body) {
        return {
          url: `${VITE_APP_REST_AUTH}/employees/request-reset-password`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: build.mutation<ResetPasswordResI, ResetPasswordReqI>({
      query(body) {
        return {
          url: `${VITE_APP_REST_AUTH}/employees/reset-password`,
          method: "POST",
          body,
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
} = AuthApi;
