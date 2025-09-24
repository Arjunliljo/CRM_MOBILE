// src/features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const bootstrapSlice = createSlice({
  name: "lead",
  initialState: {
    branches: [],
    countries: [],
    statuses: [],
    substatuses: [],
    roles: [],
    users: [],
    forms: [],
    branchConfigs: [],
    countryConfigs: [],
    statusConfigs: [],
    substatusConfigs: [],
    roleConfigs: [],
    userConfigs: [],
    formConfigs: [],
  },
  reducers: {
    setBranches: (state, action) => {
      state.branchConfigs = action.payload;
      state.branches = action.payload.data;
    },
    setCountries: (state, action) => {
      state.countryConfigs = action.payload;
      state.countries = action.payload.data;
    },
    setStatuses: (state, action) => {
      state.statusConfigs = action.payload;
      state.statuses = action.payload.data;
    },
    setSubstatuses: (state, action) => {
      state.substatusConfigs = action.payload;
      state.substatuses = action.payload.data;
    },
    setRoles: (state, action) => {
      state.roleConfigs = action.payload;
      state.roles = action.payload.data;
    },
    setUsers: (state, action) => {
      state.userConfigs = action.payload;
      state.users = action.payload.data;
    },
    setForms: (state, action) => {
      state.formConfigs = action.payload;
      state.forms = action.payload.data;
    },
  },
});

export const {
  setBranches,
  setCountries,
  setStatuses,
  setSubstatuses,
  setRoles,
  setUsers,
  setForms,
} = bootstrapSlice.actions;
export default bootstrapSlice.reducer;
