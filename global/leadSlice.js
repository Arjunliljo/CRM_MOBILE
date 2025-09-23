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
};

const leadSlice = createSlice({
  name: "lead",
  initialState: { value: 0, curLead: lead },
  reducers: {
    setCurLead: (state, action) => {
      state.curLead = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, setCurLead } =
  leadSlice.actions;
export default leadSlice.reducer;
