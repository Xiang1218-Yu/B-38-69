import { configureStore } from "@reduxjs/toolkit";
import lineupReducer from "./lineupSlice";
import equipmentReducer from "./equipmentSlice";

export const store = configureStore({
  reducer: {
    lineups: lineupReducer,
    equipment: equipmentReducer,
  },
});

export * from "./lineupSlice";
export * from "./equipmentSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
