import { createSlice } from "@reduxjs/toolkit";

export const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    permisison2: {},
  },
  reducers: {
    setPermission: (state, action) => {
      state.permisison2 = action.payload;
    },
  },
});

export const { setPermission } = permissionSlice.actions;

export default permissionSlice.reducer;
