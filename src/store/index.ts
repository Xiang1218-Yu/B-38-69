import { configureStore } from "@reduxjs/toolkit";
import lineupReducer from "./lineupSlice";

export const store = configureStore({
  reducer: {
    lineups: lineupReducer,
  },
});

export * from "./lineupSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
