import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice.js";
export const store = configureStore(
  {
    reducer: {
      user: userReducer,
    },
  },

  window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
