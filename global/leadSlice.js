// src/features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const lead = {
  img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
  name: "John Doe",
  phone: "1234567890",
  email: "john.doe@example.com",
  district: "New York",
  country: "United States",
  followupDate: "2025-01-01",
  createdAt: "2025-01-01",
  leadSource: "Website",
  status: "New",
  university: "New York University",
  branch: "Computer Science",
  course: "Bachelor of Science",
  selectedCourse: {},
};

const initialState = {
  value: 0,
  curLead: lead,
  source: "Source",
  searchQuery: "",
  curBranch: "All",
  curCountry: "All",
  curSource: "All",
  curStatus: "All",
  curSubStatus: "All",
  curForm: "All",
  curRole: "All",
  curUser: "All",
  curSelectedCourse: {},
};

const leadSlice = createSlice({
  name: "lead",
  initialState: initialState,
  reducers: {
    setCurLead: (state, action) => {
      state.curLead = action.payload;
    },
    setCurSource: (state, action) => {
      state.curSource = action.payload;
    },
    setCurBranch: (state, action) => {
      state.curBranch = action.payload;
    },
    setCurCountry: (state, action) => {
      state.curCountry = action.payload;
    },
    setCurStatus: (state, action) => {
      state.curStatus = action.payload;
    },
    setCurSubStatus: (state, action) => {
      state.curSubStatus = action.payload;
    },
    setCurForm: (state, action) => {
      state.curForm = action.payload;
    },
    setCurRole: (state, action) => {
      state.curRole = action.payload;
    },
    setCurUser: (state, action) => {
      state.curUser = action.payload;
    },
    setCurSelectedCourse: (state, action) => {
      state.curSelectedCourse = action.payload;
    },
    setLeadSearchQuery: (state, action) => {
      state.searchQuery = action.payload ?? "";
    },
  },
});

export const {
  setCurUser,
  setCurRole,
  setCurForm,
  setCurLead,
  setCurStatus,
  setCurSubStatus,
  setCurCountry,
  setCurBranch,
  setCurSource,
  setCurSelectedCourse,
  setLeadSearchQuery,
} = leadSlice.actions;
export default leadSlice.reducer;
