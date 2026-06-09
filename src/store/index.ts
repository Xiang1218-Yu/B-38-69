import { configureStore } from "@reduxjs/toolkit";
import lineupReducer from "./lineupSlice";
import itemCraftReducer from "./itemCraftSlice";

export const store = configureStore({
  reducer: {
    lineups: lineupReducer,
    itemCraft: itemCraftReducer,
  },
});

export * from "./lineupSlice";
export * from "./itemCraftSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
