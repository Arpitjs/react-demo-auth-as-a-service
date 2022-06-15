import { createSlice } from "@reduxjs/toolkit";

export const policySlice = createSlice({
  name: "policy",
  initialState: {
    policy2: {},
  },
  reducers: {
    setPolicy: (state, action) => {
      state.policy2 = action.payload;
    },
  },
});

export const { setPolicy } = policySlice.actions;

export default policySlice.reducer;
