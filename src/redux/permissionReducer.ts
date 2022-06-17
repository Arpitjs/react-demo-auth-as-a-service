import { createSlice } from "@reduxjs/toolkit";

export const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    permissionState: {},
  },
  reducers: {
    setPermission: (state, action) => {
      state.permissionState = action.payload;
    },
  },
});

export const { setPermission } = permissionSlice.actions;

export default permissionSlice.reducer;
