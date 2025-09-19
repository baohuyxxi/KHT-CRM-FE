import React from "react";

export default function CustomerContactForm() {
  return (
    <div className="mt-2">
      <label className="block text-gray-700 mb-2">Thông tin khách hàng</label>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="Nhập thông tin liên hệ"
      />
    </div>
  );
}
