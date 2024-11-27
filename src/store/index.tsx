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
import { Api } from "../_service/api";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  auth,
  [Api.reducerPath]: Api.reducer,
});

const persistConfig = {
  key: "auth-tour",
  storage, // Gunakan storage bawaan redux-persist
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
    }).concat(Api.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof reducers>;
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store, persistor };
