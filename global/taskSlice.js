import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completedFollowups: false,
  branch: "All Branches",
  selectedUser: "All Users",
  startDate: "2025-01-01",
  endDate: "2025-09-27",
  status: "All Statuses",
  subStatus: "All Sub Statuses",
  searchQuery: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setCompletedFollowups: (state, action) => {
      state.completedFollowups = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCompletedFollowups, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
