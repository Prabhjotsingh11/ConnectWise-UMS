import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: localStorage.getItem("email") || null,
    validToken: localStorage.getItem("token") || null,
    err: null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      (state.email = action.payload.email),
        (state.validToken = action.payload.token);
      localStorage.setItem("email", action.payload.email),
        localStorage.setItem("token", action.payload.token);
    },
    signupSuccess: (state, action) => {
      (state.email = action.payload.email),
        (state.validToken = action.payload.token),
        localStorage.setItem("email", action.payload.email),
        localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.validToken = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});
export const { loginSuccess, signupSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
