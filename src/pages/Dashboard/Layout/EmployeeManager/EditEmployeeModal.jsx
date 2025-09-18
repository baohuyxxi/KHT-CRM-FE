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
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-2xl w-[500px] h-[450px] shadow-xl flex flex-col">
      <h3 className="text-xl font-bold mb-6 text-gray-800">
        Chỉnh sửa nhân viên
      </h3>

      {/* Nội dung scroll nếu cần */}
      <div className="flex-1 overflow-y-auto space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Tên nhân viên
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên nhân viên"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email nhân viên"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="accent-blue-500 w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Nhân viên hiện hành</span>
        </label>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleResetPassword}
          className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition"
        >
          Reset mật khẩu
        </button>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
);

}
