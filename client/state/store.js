import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedReducer = persistReducer(
  {
    key: "auth",
    storage,
    timeout: 1800000,
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistedStore = persistStore(store);
