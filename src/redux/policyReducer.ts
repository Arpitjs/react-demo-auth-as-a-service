import { createSlice } from "@reduxjs/toolkit";

export const policySlice = createSlice({
  name: "policy",
  initialState: {
    policyState: {},
  },
  reducers: {
    setPolicy: (state, action) => {
      state.policyState = action.payload;
    },
  },
});

export const { setPolicy } = policySlice.actions;

export default policySlice.reducer;
