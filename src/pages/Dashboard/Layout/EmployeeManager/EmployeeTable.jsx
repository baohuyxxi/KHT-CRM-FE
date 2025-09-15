import { useState } from "react";
import EditEmployeeModal from "./EditEmployeeModal";
import RoleEmployeeModal from "./RoleEmployeeModal";

export default function EmployeeTable({ employees, page, setPage, pageSize, setPageSize, total, loading }) {
  const [editEmployee, setEditEmployee] = useState(null);
  const [roleEmployee, setRoleEmployee] = useState(null);

  const handleEditSave = (updated) => {
    console.log("Save edited employee:", updated);
    // TODO: gọi API update tên nhân viên
  };

  const handleRoleSave = (updated) => {
    console.log("Save role employee:", updated);
    // TODO: gọi API update role
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Tên</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Trạng thái</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Vai trò</th>
            <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-6">Đang tải...</td>
            </tr>
          ) : employees.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6">Không có nhân viên</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">{emp.userId}</td>
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">
                  {emp.isActive ? (
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">Hiện hành</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs">Nghỉ việc</span>
                  )}
                </td>
                <td className="px-4 py-2">{emp.role || "Chưa phân quyền"}</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <button
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                    onClick={() => setEditEmployee(emp)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    onClick={() => setRoleEmployee(emp)}
                  >
                    Cấp quyền
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center p-2">
        <div>Hiển thị {employees.length} / {total}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
          <span>{page}</span>
          <button onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="border rounded px-2 py-1">
            {[10, 20, 50].map((size) => <option key={size} value={size}>{size} / trang</option>)}
          </select>
        </div>
      </div>

      {/* Modals */}
      {editEmployee && <EditEmployeeModal employee={editEmployee} onClose={() => setEditEmployee(null)} onSave={handleEditSave} />}
      {roleEmployee && <RoleEmployeeModal employee={roleEmployee} onClose={() => setRoleEmployee(null)} onSave={handleRoleSave} />}
    </div>
  );
}
