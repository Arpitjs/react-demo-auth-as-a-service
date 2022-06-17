import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    roleState: {},
  },
  reducers: {
    setRoleX: (state, action) => {
      state.roleState = action.payload;
    },
  },
});

export const { setRoleX } = roleSlice.actions;

export default roleSlice.reducer;
