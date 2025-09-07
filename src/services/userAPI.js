import api from "./api";

export const getUser = () => {
  return api.get(`/users/me`);
};

export const updateUser = (data) => {
  return api.patch(`/users/me`, data);
};

export const changePassword = (data) => {
  return api.patch(`/users/me/password`, data);
};