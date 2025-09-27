import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completedFollowups: false,
  branch: "All Branches",
  selectedUser: "All Users",
  startDate: "2025-01-01",
  endDate: "2025-09-27",
  status: "All Statuses",
  subStatus: "All Sub Statuses",
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setCompletedFollowups: (state, action) => {
      state.completedFollowups = action.payload;
    },
  },
});

export const { setCompletedFollowups } = taskSlice.actions;
export default taskSlice.reducer;
