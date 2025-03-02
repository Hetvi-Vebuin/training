import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "../features/LanguageSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/AuthSlice"
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "lng",
  storage,
};
const tokenConfig = {
  key: "token",
  storage,
};
const persistedReducer = persistReducer(persistConfig, languageSlice);
const persistedToken = persistReducer(tokenConfig, authReducer);

const store = configureStore({
  reducer: {
    language: persistedReducer,
    auth: persistedToken,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export default store;
