// src/components/task/TaskItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { performTask } from "~/services/taskAPI";

export default function TaskItem({ task }) {
  const navigate = useNavigate();

  const handlePerform = () => {
    if (task.logs && task.logs.length > 0) {
      navigate(`/tasks/${task.logs[0]}/logs`);
    } else {
      performTask(task._id).then((res) => {
        navigate(`/tasks/${res.data._id}/logs`);
      });
    }
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">Loại: {task.type}</p>
      {task.details && <p className="mt-2">{task.details}</p>}
      {task.status && (
        <span
          className={`mt-2 inline-block px-2 py-1 rounded text-white text-xs ${
            task.status === "pending"
              ? "bg-yellow-500"
              : task.status === "in_progress"
              ? "bg-blue-500"
              : "bg-green-500"
          }`}
        >
          {task.status}
        </span>
      )}

      <button
        onClick={handlePerform}
        className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
      >
        Thực hiện
      </button>
    </div>
  );
}
