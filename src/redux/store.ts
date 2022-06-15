import { configureStore } from "@reduxjs/toolkit";
import permissionReducer from "./permissionReducer";
import policyReducer from "./policyReducer";

export default configureStore({
  reducer: {
    policy: policyReducer,
    permission: permissionReducer,
  },
});
