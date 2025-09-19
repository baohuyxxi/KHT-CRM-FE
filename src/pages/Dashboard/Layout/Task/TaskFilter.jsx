// src/components/task/TaskFilter.jsx
import React from "react";

export default function TaskFilter({
  statusValue,
  onStatusChange,
  roleValue,
  onRoleChange,
}) {
  const statusFilters = [
    { key: "", label: "Tất cả", count: 18, color: "bg-gray-400" },
    { key: "pending", label: "Cần hoàn thành", count: 1, color: "bg-red-500" },
    { key: "in_progress", label: "Đang tiến hành", count: 2, color: "bg-yellow-500" },
    { key: "completed", label: "Đã hoàn thành", count: 15, color: "bg-green-500" },
  ];

  const roleFilters = [
    { key: "", label: "Tất cả" },
    { key: "assigned", label: "Được giao" },
    { key: "created", label: "Tôi tạo" },
  ];

  return (
    <div className="space-y-4 my-4">
      {/* Lọc theo trạng thái */}
      <div className="flex gap-4">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => onStatusChange(f.key)}
            className={`
              flex flex-col items-center justify-center px-4 py-2 rounded-lg shadow
              text-white font-medium transition transform hover:scale-105
              ${f.color} ${statusValue === f.key ? "ring-2 ring-offset-2 ring-gray-700" : ""}
            `}
          >
            <span className="text-lg font-bold">{f.count}</span>
            <span className="text-xs">{f.label}</span>
          </button>
        ))}
      </div>

      {/* Lọc theo người liên quan */}
      <div className="flex gap-3">
        {roleFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => onRoleChange(f.key)}
            className={`
              px-4 py-2 rounded-full border text-sm font-medium transition
              ${roleValue === f.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
