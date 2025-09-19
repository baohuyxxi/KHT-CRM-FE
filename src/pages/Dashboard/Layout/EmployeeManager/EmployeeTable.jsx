import { useState } from "react";
import EditEmployeeModal from "./EditEmployeeModal";
import RoleEmployeeModal from "./RoleEmployeeModal";
import { MdEdit } from "react-icons/md";

export default function EmployeeTable({
  employees,
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
  loading,
}) {
  const [editEmployee, setEditEmployee] = useState(null);
  const [roleEmployee, setRoleEmployee] = useState(null);

  const handleEditSave = (updated) => {
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["ID", "Tên", "Email", "Trạng thái", "Hành động"].map((title) => (
              <th
                key={title}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employees.map((emp) => (
            <tr key={emp._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-3 text-sm">{emp.userId}</td>
              <td className="px-6 py-3 text-sm font-medium">{emp.name}</td>
              <td className="px-6 py-3 text-sm">{emp.email}</td>
              <td className="px-6 py-3">
                {emp.isActive ? (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    Hiện hành
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                    Nghỉ việc
                  </span>
                )}
              </td>

              {/* Hành động */}
              <td className="px-6 py-3 flex items-center gap-3">
                <button
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition text-sm"
                  onClick={() => setRoleEmployee(emp)}
                >
                  Cấp quyền
                </button>
                <button
                  className="p-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition flex items-center justify-center"
                  onClick={() => setEditEmployee(emp)}
                >
                  <MdEdit size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center p-3 border-t mt-2">
        <div className="text-sm text-gray-600">
          Hiển thị {employees.length} / {total} nhân viên
        </div>

        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className="px-2 py-1 border rounded hover:bg-gray-100 transition"
            disabled={page === 1}
          >
            <span className="text-lg font-bold">&lt;</span>
          </button>

          {/* Page number */}
          <span className="px-3 py-1 border rounded bg-gray-100 text-sm font-medium">
            {page}
          </span>

          {/* Next */}
          <button
            onClick={() => setPage(page + 1)}
            className="px-2 py-1 border rounded hover:bg-gray-100 transition"
            disabled={employees.length < pageSize}
          >
            <span className="text-lg font-bold">&gt;</span>
          </button>

          {/* Page size */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} / trang
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modals */}
      {editEmployee && (
        <EditEmployeeModal
          employee={editEmployee}
          onClose={() => setEditEmployee(null)}
          onSave={handleEditSave}
        />
      )}
      {roleEmployee && (
        <RoleEmployeeModal
          employee={roleEmployee}
          onClose={() => setRoleEmployee(null)}
        />
      )}
    </div>
  );
}
