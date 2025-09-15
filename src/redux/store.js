import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setCredentials } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Khôi phục state từ localStorage
const user = localStorage.getItem("user");
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

if (user && accessToken) {
  store.dispatch(
    setCredentials({
      user: JSON.parse(user),
      accessToken,
      refreshToken,
    })
  );
}
