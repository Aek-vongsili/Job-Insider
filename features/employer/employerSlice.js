import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employersList: [],
  category: [
    {
      id: 1,
      name: "Residential",
      value: "residential",
    },
    {
      id: 2,
      name: "Commercial",
      value: "commercial",
    },
    {
      id: 3,
      name: "Industrial",
      value: "industrial",
    },
    {
      id: 4,
      name: "Apartments",
      value: "apartments",
    },
  ],
  companySize: [],
};

export const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    employersList: (state, { payload }) => {
      state.employersList = payload;
    },
  },
});

export const { employersList } = employerSlice.actions;
export default employerSlice.reducer;
