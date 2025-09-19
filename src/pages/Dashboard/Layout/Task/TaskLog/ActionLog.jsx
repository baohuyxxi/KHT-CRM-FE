import React, { useState } from "react";

export default function ActionLog({ log }) {
  if (!log) return null;

  const [actions, setActions] = useState(mockActions);

  const toggleAction = (id) => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, done: !a.done } : a
      )
    );
  };

  const progress = Math.round(
    (actions.filter((a) => a.done).length / actions.length) * 100
  );

  return (
    <div className="mt-6 space-y-6">
      {/* Checklist giống Trello */}
      <div className="bg-white shadow rounded-lg p-4 border">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Tiến độ</h2>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Checklist items */}
        <ul className="space-y-3">
          {actions.map((action) => (
            <li
              key={action.id}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={action.done}
                onChange={() => toggleAction(action.id)}
                className="w-5 h-5 accent-green-600 cursor-pointer"
              />
              <span
                className={`text-base ${
                  action.done ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {action.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upload Tài liệu */}
      <div className="bg-white shadow rounded-lg p-4 border">
        <h2 className="text-lg font-semibold mb-3">Tài liệu đính kèm</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Hồ sơ */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Hồ sơ (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="border rounded p-2 text-sm"
            />
            <div className="border rounded p-3 text-center text-gray-500 text-sm">
              Chưa có file
            </div>
          </div>

          {/* Phiếu yêu cầu */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Phiếu yêu cầu (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="border rounded p-2 text-sm"
            />
            <div className="border rounded p-3 text-center text-gray-500 text-sm">
              Chưa có file
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockActions = [
  { id: 1, label: "Viết hồ sơ, phiếu yêu cầu", done: true },
  { id: 2, label: "Đấu nối trên hệ thống", done: false },
  { id: 3, label: "Kiểm tra phê duyệt hồ sơ", done: false },
];
