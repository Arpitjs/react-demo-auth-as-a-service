import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    role2: {},
  },
  reducers: {
    setRoleX: (state, action) => {
      state.role2 = action.payload;
    },
  },
});

export const { setRoleX } = roleSlice.actions;

export default roleSlice.reducer;
