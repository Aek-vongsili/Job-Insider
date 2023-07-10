import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company_info: null,
  location: null,
  social: null,
};

const employerProfile = createSlice({
  name: "employer-profile",
  initialState,
  reducers: {
    setCompanyData: (state, { payload }) => {
      state.company_info = payload.company_info;
      state.location = payload.location;
      state.social = payload.social;
    },
  },
});

export const { setCompanyData } = employerProfile.actions;

export default employerProfile.reducer;
