import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyName: localStorage.getItem("comp")
    ? localStorage.getItem("comp")
    : null,
};

const CompanyNameSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
  },
});

export const { setCompanyName } = CompanyNameSlice.actions;
export default CompanyNameSlice.reducer;
