import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function EmployeeFilter({ filterStatus, setFilterStatus, search, setSearch }) {
  const statuses = [
    { key: "active", label: "Nhân viên hiện hành" },
    { key: "all", label: "Tất cả nhân viên" },
    { key: "disabled", label: "Nhân viên nghỉ việc" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilterStatus(s.key)}
            className={`px-4 py-1 rounded font-medium transition
              ${filterStatus === s.key ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full md:w-64">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>
    </div>
  );
}
