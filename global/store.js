import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leadSlice";
import studentReducer from "./studentSlice";
import applicationReducer from "./applicationSlice";
import bootstrapReducer from "./bootstrapSlice";
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    lead: leadReducer,
    student: studentReducer,
    applicaiton: applicationReducer,
    bootstrap: bootstrapReducer,
    task: taskReducer,
  },
});
