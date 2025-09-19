import React, { useState } from "react";
import SigningForm from "./forms/SigningForm";
import CustomerContactForm from "./forms/CustomerContactForm";
import ProductPriceUpdateForm from "./forms/ProductPriceUpdateForm";
import OtherForm from "./forms/OtherForm";
import { createTask } from "~/services/taskAPI";
import { useNavigate } from "react-router-dom";

const FORM_OPTIONS = [
  { value: "signing", label: "Đấu nối Chữ ký số & Hóa đơn điện tử" },
  { value: "customer_contact", label: "Liên hệ khách hàng" },
  { value: "product_price_update", label: "Cập nhật giá sản phẩm" },
  { value: "other", label: "Khác" },
];

export default function CreateTask({ onClose }) {
  const [selectedOption, setSelectedOption] = useState("signing");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const data = {
        title,
        type: selectedOption,
        // các field chi tiết form sẽ được lấy từ subcomponent qua prop callback
      };
      await createTask(data);
      alert("Tạo task thành công!");
      navigate("/tasks"); // quay về danh sách
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi tạo task.");
    }
  };

  const renderFormByOption = () => {
    switch (selectedOption) {
      case "signing":
        return <SigningForm />;
      case "customer_contact":
        return <CustomerContactForm />;
      case "product_price_update":
        return <ProductPriceUpdateForm />;
      case "other":
        return <OtherForm />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg border relative max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Tạo Công Việc Mới</h2>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
      )}

      <div className="mb-4">
        <select
          className="w-full px-3 py-2 border rounded mb-2"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {FORM_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <label className="block text-gray-700 mb-2">Tiêu đề</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Nhập tiêu đề công việc"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {renderFormByOption()}

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Lưu Công Việc
      </button>
    </div>
  );
}
