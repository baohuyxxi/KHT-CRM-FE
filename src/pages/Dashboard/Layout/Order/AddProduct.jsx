import { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    customerCCCD: "",
    customerName: "",
    companyTax: "",
    companyName: "",
    registerDate: "",
    startDate: "",
    expireDate: "",
    expectedEnd: "",
    price: "",
    paymentStatus: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đã thêm sản phẩm: " + JSON.stringify(form, null, 2));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-6">Thêm sản phẩm cho khách hàng</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hàng 1: Tên sản phẩm */}
        <div>
          <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
          <select
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">-- Chọn sản phẩm --</option>
            <option value="Phần mềm kế toán">Phần mềm kế toán</option>
            <option value="POS365">POS365</option>
            <option value="Chữ ký số Viettel">Chữ ký số Viettel</option>
            <option value="Hóa đơn điện tử">Hóa đơn điện tử</option>
            <option value="Hosting">Hosting</option>
          </select>
        </div>

        {/* Hàng 2: CCCD + Tên KH */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">CCCD KH</label>
            <input
              type="text"
              name="customerCCCD"
              value={form.customerCCCD}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tên KH</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Hàng 3: MST + Tên doanh nghiệp */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">MST DN</label>
            <input
              type="text"
              name="companyTax"
              value={form.companyTax}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tên doanh nghiệp</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Hàng 4: Ngày tháng */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ngày đăng ký</label>
            <input
              type="date"
              name="registerDate"
              value={form.registerDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hạn sử dụng</label>
            <input
              type="date"
              name="expireDate"
              value={form.expireDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dự kiến hết hạn</label>
            <input
              type="date"
              name="expectedEnd"
              value={form.expectedEnd}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Hàng 5: Giá & trạng thái */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mức giá</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái thanh toán</label>
            <select
              name="paymentStatus"
              value={form.paymentStatus}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">-- Chọn --</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Chưa thanh toán">Chưa thanh toán</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">-- Chọn --</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang xử lý">Đang xử lý</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
        >
          Lưu sản phẩm
        </button>
      </form>
    </div>
  );
}
