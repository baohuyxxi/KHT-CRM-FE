import React, { useState } from "react";

export default function EditEmployeeModal({ employee, onClose, onSave, onResetPassword }) {
  const [name, setName] = useState(employee?.name || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [isActive, setIsActive] = useState(employee?.isActive ?? true);

  if (!employee) return null;

  const handleSave = () => {
    onSave({
      ...employee,
      name,
      email,
      isActive,
    });
    onClose();
  };

  const handleResetPassword = () => {
    if (onResetPassword) onResetPassword(employee._id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-semibold mb-4">Chỉnh sửa nhân viên</h3>

        <label className="block mb-2 text-sm font-medium">Tên nhân viên</label>
        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên nhân viên"
        />

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full mb-3 border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email nhân viên"
        />

        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mr-2"
          />
          Nhân viên hiện hành
        </label>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleResetPassword}
            className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Reset mật khẩu
          </button>

          <div className="flex gap-2">
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
    </div>
  );
}
