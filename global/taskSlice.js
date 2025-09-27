import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completedFollowups: false,
  branch: "All",
  selectedUser: "All",
  startDate: "2025-01-01",
  endDate: "2025-09-27",
  status: "All",
  subStatus: "All",
  role: "All",
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
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSubStatus: (state, action) => {
      state.subStatus = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const {
  setCompletedFollowups,
  setSearchQuery,
  setBranch,
  setSelectedUser,
  setStatus,
  setSubStatus,
  setRole,
} = taskSlice.actions;
export default taskSlice.reducer;
