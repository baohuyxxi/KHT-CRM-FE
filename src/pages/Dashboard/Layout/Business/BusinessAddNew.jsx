import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

export default function AddBusiness() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    managerAccount: "",
    managerName: "",
    type: "TC",
    taxId: "",
    licenseCode: "",
    licenseFile: null,
    startDate: "",
    address: "",
    phone: "",
    email: "",
    representativeId: "",
    representativeName: "",
    active: true,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!/^[0-9]{10}$/.test(formData.taxId)) {
      newErrors.taxId = "MST phải gồm 10 chữ số";
    }
    if (!/^[0-9]{9,12}$/.test(formData.representativeId)) {
      newErrors.representativeId = "CCCD phải từ 9-12 số";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!/^[0-9]{9,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Doanh nghiệp đã được thêm thành công!");
    navigate("/business");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Thêm doanh nghiệp</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin người quản lý */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Thông tin người quản lý
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Tài khoản quản lý</label>
              <input
                type="text"
                name="managerAccount"
                value={formData.managerAccount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Tên người quản lý</label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* Thông tin doanh nghiệp */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Thông tin doanh nghiệp
          </h2>

          {/* Loại hình + MST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Loại hình</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="TC">Tổ chức</option>
                <option value="HKD">Hộ kinh doanh</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">MST</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              {errors.taxId && (
                <p className="text-red-500 text-sm">{errors.taxId}</p>
              )}
            </div>
          </div>

          {/* Mã GPKD + File Upload + Ngày ĐK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Mã GPKD</label>
              <input
                type="text"
                name="licenseCode"
                value={formData.licenseCode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">File GPKD (PDF)</label>
              <input
                type="file"
                name="licenseFile"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Ngày đăng ký KD</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block mb-1">Địa chỉ</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows={2}
              required
            />
          </div>

          {/* SĐT + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Số điện thoại doanh nghiệp</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Email doanh nghiệp</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Trạng thái */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <span>Đang hoạt động</span>
          </div>
        </div>

        {/* Thông tin người đại diện */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Thông tin người đại diện
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">CCCD</label>
              <input
                type="text"
                name="representativeId"
                value={formData.representativeId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              {errors.representativeId && (
                <p className="text-red-500 text-sm">{errors.representativeId}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Tên người đại diện</label>
              <input
                type="text"
                name="representativeName"
                value={formData.representativeName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Lưu doanh nghiệp
          </button>
        </div>
      </form>
    </div>
  );
}
