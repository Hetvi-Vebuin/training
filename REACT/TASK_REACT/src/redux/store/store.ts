import {configureStore} from "@reduxjs/toolkit";
import languageReduser from "../features/languageReduser";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    language:languageReduser
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;