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
      const payloadData = action.payload?.data;
      state.branches = Array.isArray(payloadData?.data)
        ? payloadData.data
        : Array.isArray(payloadData)
        ? payloadData
        : [];
    },
    setCountries: (state, action) => {
      state.countryConfigs = action.payload;
      const payloadData = action.payload?.data;
      state.countries = Array.isArray(payloadData?.data)
        ? payloadData.data
        : Array.isArray(payloadData)
        ? payloadData
        : [];
    },
    setStatuses: (state, action) => {
      state.statusConfigs = action.payload;
      const payloadData = action.payload?.data;
      state.statuses = Array.isArray(payloadData?.data)
        ? payloadData.data
        : Array.isArray(payloadData)
        ? payloadData
        : [];
    },
    setSubstatuses: (state, action) => {
      state.substatusConfigs = action.payload;
      const payloadData = action.payload?.data;
      state.substatuses = Array.isArray(payloadData?.data)
        ? payloadData.data
        : Array.isArray(payloadData)
        ? payloadData
        : [];
    },
    setRoles: (state, action) => {
      state.roleConfigs = action.payload;
      const payloadData = action.payload?.data;
      state.roles = Array.isArray(payloadData?.data)
        ? payloadData.data
        : Array.isArray(payloadData)
        ? payloadData
        : [];
    },
    setUsers: (state, action) => {
      state.userConfigs = action.payload;
      const payloadData = action.payload?.data;
      state.users = Array.isArray(payloadData?.data)
        ? payloadData.data
        : Array.isArray(payloadData)
        ? payloadData
        : [];
    },
    setForms: (state, action) => {
      state.formConfigs = action.payload;
      const payloadData = action.payload?.data;
      state.forms = Array.isArray(payloadData?.data)
        ? payloadData.data
        : Array.isArray(payloadData)
        ? payloadData
        : [];
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
