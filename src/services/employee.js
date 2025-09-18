import api from "./api";

// Lấy danh sách nhân viên với params: page, limit, status, keyword
export const getAllEmployees = async (params = {}) => {
  const res = await api.get("/employees", { params });
  return res.data;
};

// Tạo nhân viên mới
export const createEmployee = async (payload) => {
  const res = await api.post("/employees", payload);
  return res.data;
};

// Lấy 1 nhân viên theo id
export const getEmployeeById = async (id) => {
  const res = await api.get(`/employees/${id}`);
  return res.data;
};

export const getPermission = async (id) => {
  const res = await api.get(`/employees/${id}/permissions`);
  return res.data;
}
//Cập nhật quyền nhân viên
export const updatePermission = async (id, payload) => {
  const res = await api.put(`/employees/${id}/permissions`, payload);
  return res.data;
}
// Cập nhật nhân viên
export const updateEmployee = async (id, payload) => {
  const res = await api.put(`/employees/${id}`, payload);
  return res.data;
};
