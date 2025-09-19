// src/pages/Task.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCreatedTasks, getAssignedTasks } from "~/services/taskAPI";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";

export default function Task() {
  const navigate = useNavigate();

  const [createdTasks, setCreatedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); // "", "created", "assigned"

  const fetchTasks = async () => {
    try {
      const [created, assigned] = await Promise.all([
        getCreatedTasks(statusFilter),
        getAssignedTasks(statusFilter),
      ]);
      setCreatedTasks(created.data);
      setAssignedTasks(assigned.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const renderTaskLists = () => {
    if (roleFilter === "created") {
      return (
        <>
          <h2 className="text-xl font-semibold mt-4">Công việc bạn tạo</h2>
          <TaskList tasks={createdTasks} />
        </>
      );
    }

    if (roleFilter === "assigned") {
      return (
        <>
          <h2 className="text-xl font-semibold mt-4">Công việc bạn được giao</h2>
          <TaskList tasks={assignedTasks} />
        </>
      );
    }

    // mặc định: hiển thị cả hai
    return (
      <>
        <h2 className="text-xl font-semibold mt-4">Công việc bạn tạo</h2>
        <TaskList tasks={createdTasks} />

        <h2 className="text-xl font-semibold mt-4">Công việc bạn được giao</h2>
        <TaskList tasks={assignedTasks} />
      </>
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Danh sách Công Việc</h1>

      <button
        onClick={() => navigate("/tasks/create")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Tạo Công Việc Mới
      </button>

      {/* Bộ lọc */}
      <TaskFilter
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        roleValue={roleFilter}
        onRoleChange={setRoleFilter}
      />

      {renderTaskLists()}
    </div>
  );
}
