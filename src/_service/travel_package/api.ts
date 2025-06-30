import { RootState } from "../../store";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { deleteTokenAuth } from "../../store/auth";
import { VITE_APP_TRAVEL_PACKAGE } from "../../_constants/constant";

export interface ApiResponseI<T> {
  data: T;
}

export interface ApiErrorResponseI {
  message: string;
  statusCode: number;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: VITE_APP_TRAVEL_PACKAGE,

  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token && endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (process.env.NODE_ENV === "development") {
    console.info("[RTK Api fetch]:", args);
  }
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 401) {
      toast("Please re-login for continue process");
      api.dispatch(deleteTokenAuth());
    }
    // showToast((result.error.data as ApiErrorResponseI).message || 'Unknown Error');
  }
  if (process.env.NODE_ENV === "development") {
    console.info("[RTK Api result]:", result);
  }
  return result;
};

export const Api = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "travel_package",
  endpoints: () => ({}),
});
