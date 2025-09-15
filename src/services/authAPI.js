import api from "./api";

// Đăng ký
export const register = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

// Đăng nhập
export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data.data; // { accessToken, refreshToken, user }
};

// Đăng xuất
export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Đăng xuất tất cả
export const logoutAll = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  await api.post("/auth/logout-all", { refreshToken });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Đổi mật khẩu
export const changePassword = async (oldPassword, newPassword) => {
  const res = await api.post("/auth/change-password", {
    oldPassword,
    newPassword,
  });
  return res.data;
};
