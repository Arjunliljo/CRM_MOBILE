import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leadSlice";

export const store = configureStore({
  reducer: {
    lead: leadReducer,
  },
});
