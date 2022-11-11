import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "./slices/trendingSlice";
import coinsReducer from "./slices/coinsSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    trending: trendingReducer,
    theme: themeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
