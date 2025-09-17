import React, { useState, useEffect } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { getPermission } from "~/services/employee";
import { permissionTree } from "~/mock/permissionTree";

export default function RoleEmployeeModal({ employee, onClose, onSave }) {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load quyền từ BE
  useEffect(() => {
    if (!employee?._id) return;
    setLoading(true);
    getPermission(employee._id)
      .then((res) => {
        setChecked(res.data || []); // tick quyền đã có
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [employee]);

  const handleSave = () => {
    onSave({ ...employee, permissions: checked });
    onClose();
  };

  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
  <div className="bg-white p-8 rounded-2xl w-[700px] h-[600px] shadow-xl flex flex-col">
    <h3 className="text-2xl font-bold mb-6 text-gray-900">
      Cấp quyền nhân viên
    </h3>

    {/* Nội dung scroll */}
    <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-gray-50 text-lg">
      {loading ? (
        <div className="text-center text-gray-500">Đang tải...</div>
      ) : (
        <CheckboxTree
          nodes={permissionTree}
          checked={checked}
          expanded={expanded}
          onCheck={(c) => setChecked(c)}
          onExpand={(e) => setExpanded(e)}
          iconsClass="fa5"
          icons={{
            check: <span className="text-sky-500">✔</span>,
            uncheck: <span className="text-sky-300">○</span>,
            halfCheck: <span className="text-sky-400">◐</span>,
            expandClose: <span className="text-gray-500">▶</span>,
            expandOpen: <span className="text-gray-500">▼</span>,
          }}
        />
      )}
    </div>

    {/* Footer nút bấm */}
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={onClose}
        className="px-5 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-100 text-lg"
      >
        Hủy
      </button>
      <button
        onClick={handleSave}
        className="px-5 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 text-lg"
      >
        Lưu
      </button>
    </div>
  </div>
</div>

  );
}
