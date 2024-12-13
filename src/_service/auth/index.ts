import { LoginReqI, LoginResI } from "../../__interface/auth.interface";
import {} from "../../__interface/tourpackage.interface";

import { Api } from "../api";

export const AuthApi = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query(body) {
        return {
          url: `http://localhost:3001/auth/login`,
          method: "POST",
          body,
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const { useLoginMutation } = AuthApi;
