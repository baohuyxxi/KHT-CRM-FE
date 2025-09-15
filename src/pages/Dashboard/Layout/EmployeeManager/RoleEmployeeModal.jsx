import React, { useState, useEffect } from "react";
import { getPermission } from "~/services/employee"; // API lấy permissions hiện tại

export default function RoleEmployeeModal({ employee, allRoles = [], onClose, onSave }) {
  const [selectedRole, setSelectedRole] = useState(employee?.role || "");
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load permissions của user khi modal mở
  useEffect(() => {
    if (!employee?._id) return;

    setLoading(true);
    getPermission(employee._id)
      .then((res) => {
        setPermissions(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [employee]);

  // Khi role thay đổi, tự động cập nhật permissions theo role
  useEffect(() => {
    const roleData = allRoles.find((r) => r.name === selectedRole);
    if (roleData?.permissions) setPermissions(roleData.permissions);
  }, [selectedRole, allRoles]);

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSave = () => {
    onSave({ ...employee, role: selectedRole, permissions });
    onClose();
  };

  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Cấp quyền nhân viên</h3>

        <label className="block mb-2 font-medium">Chọn vai trò:</label>
        <select
          className="w-full mb-4 border px-3 py-2 rounded"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {allRoles.map((role) => (
            <option key={role._id} value={role.name}>
              {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Phân quyền:</label>
        <div className="mb-4 grid grid-cols-1 gap-1 max-h-48 overflow-y-auto border p-2 rounded">
          {loading ? (
            <div className="text-center text-sm text-gray-500">Đang tải...</div>
          ) : permissions.length === 0 ? (
            <div className="text-center text-sm text-gray-500">Không có quyền</div>
          ) : (
            permissions.map((perm) => (
              <label key={perm} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={permissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                />
                <span className="text-sm">{perm}</span>
              </label>
            ))
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
