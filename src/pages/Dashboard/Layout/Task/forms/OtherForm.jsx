import React from "react";

export default function OtherForm() {
  return (
    <div className="mt-2">
      <label className="block text-gray-700 mb-2">Ghi chú khác</label>
      <textarea
        className="w-full px-3 py-2 border rounded"
        placeholder="Nhập nội dung khác"
      />
    </div>
  );
}
