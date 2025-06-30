import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import auth from "./auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CookieStorage from "../store/cookiesStorage";
import Cookies from "cookies-js";
import { Api as CarsApi } from "../_service/cars/api";
import { Api as TravelPackageApi } from "../_service/travel_package/api";

const reducers = combineReducers({
  auth,
  [CarsApi.reducerPath]: CarsApi.reducer,
  [TravelPackageApi.reducerPath]: TravelPackageApi.reducer,
});

const persistConfig = {
  key: "auth-tour",
  storage: new CookieStorage(Cookies, {}), // Gunakan storage bawaan redux-persist
  whitelist: ["auth"], // Reducer yang akan dipersist
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(CarsApi.middleware, TravelPackageApi.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof reducers>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store, persistor };
