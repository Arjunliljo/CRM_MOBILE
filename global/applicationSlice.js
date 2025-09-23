// src/features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const application = {
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
};

const applicationSlice = createSlice({
  name: "student",
  initialState: { value: 0, curLead: lead, source: "Source" },
  reducers: {
    setCurApplication: (state, action) => {
      state.curLead = action.payload;
    },
    setCurSource: (state, action) => {
      state.source = action.payload;
    },
    setCurBranch: (state, action) => {
      state.branch = action.payload;
    },
    setCurCountry: (state, action) => {
      state.country = action.payload;
    },
    setCurDistrict: (state, action) => {
      state.district = action.payload;
    },
    setCurStatus: (state, action) => {
      state.status = action.payload;
    },
    setCurSubStatus: (state, action) => {
      state.subStatus = action.payload;
    },
    setCurForm: (state, action) => {
      state.form = action.payload;
    },
    setCurRole: (state, action) => {
      state.role = action.payload;
    },
    setCurUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setCurUser,
  setCurRole,
  setCurForm,
  setCurApplication,
  setCurStatus,
  setCurSubStatus,
  setCurDistrict,
  setCurCountry,
  setCurBranch,
  setCurSource,
} = applicationSlice.actions;
export default applicationSlice.reducer;
