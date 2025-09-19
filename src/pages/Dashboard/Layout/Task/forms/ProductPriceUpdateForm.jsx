import React from "react";

export default function ProductPriceUpdateForm() {
  return (
    <div className="mt-2">
      <label className="block text-gray-700 mb-2">Cập nhật giá sản phẩm</label>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="Nhập thông tin sản phẩm và giá"
      />
    </div>
  );
}
