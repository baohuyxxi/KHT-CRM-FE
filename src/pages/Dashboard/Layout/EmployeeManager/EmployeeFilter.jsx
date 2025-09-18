import { FiSearch } from "react-icons/fi";

export default function EmployeeFilter({ filterStatus, setFilterStatus, search, setSearch }) {
  const statuses = [
    { key: "active", label: "Nhân viên hiện hành" },
    { key: "all", label: "Tất cả nhân viên" },
    { key: "disabled", label: "Nhân viên nghỉ việc" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilterStatus(s.key)}
            className={`px-5 py-2 rounded-lg font-medium transition 
              ${filterStatus === s.key ? "bg-primary text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative w-full md:w-64">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>
    </div>
  );
}
