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
    setCompanySignOut: (state, { payload }) => {
      return initialState;
    },
  },
});

export const { setCompanyData, setCompanySignOut } = employerProfile.actions;

export default employerProfile.reducer;
