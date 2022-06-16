import { configureStore } from "@reduxjs/toolkit";
import permissionReducer from "./permissionReducer";
import policyReducer from "./policyReducer";
import roleReducer from "./roleReducer";

export default configureStore({
  reducer: {
    role: roleReducer,
    policy: policyReducer,
    permission: permissionReducer,
  },
});
