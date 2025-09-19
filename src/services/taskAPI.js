// src/services/taskAPI.js
import api from "./api";

// Tạo task mới
export const createTask = async (data) => {
  const response = await api.post("/tasks/create", data);
  return response.data;
};

// Lấy task mình tạo, có thể filter theo status
export const getCreatedTasks = async (status) => {
  const response = await api.get("/tasks/created", {
    params: status ? { status } : {},
  });
  return response.data;
};

// Lấy task mình được giao, có thể filter theo status
export const getAssignedTasks = async (status) => {
  const response = await api.get("/tasks/assigned", {
    params: status ? { status } : {},
  });
  return response.data;
};

// Thực hiện task (tạo TaskLog)
export const performTask = async (taskId) => {
  const response = await api.post(`/tasks/${taskId}/log`);
  return response.data;
};

// Lấy tất cả log của 1 task
export const getTaskLogs = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}/logs`);
  return response.data;
};

// Cập nhật log
export const updateTaskLog = async (logId, updateData) => {
  const response = await api.patch(`/tasks/log/${logId}`, updateData);
  return response.data;
};
