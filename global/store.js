import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leadSlice";
import studentReducer from "./studentSlice";
import applicationReducer from "./applicationSlice";
import bootstrapReducer from "./bootstrapSlice";

export const store = configureStore({
  reducer: {
    lead: leadReducer,
    student: studentReducer,
    applicaiton: applicationReducer,
    bootstrap: bootstrapReducer,
  },
});
