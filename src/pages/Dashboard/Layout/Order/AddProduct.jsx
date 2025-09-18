import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "~/services/customerAPI";
import { createOrder } from "~/services/orderAPI";

export default function AddOrder() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    cusId: "",
    cusCitizenId: "",
    cusName: "",
    busId: "",
    busTaxId: "",
    busName: "",
    registerDate: "",
    startDate: "",
    guarantee: "",
    expire: "vĩnh viễn", // mặc định
    expectedEnd: "",
    price: "",
    paymentStatus: "Chưa thanh toán",
    paid: 0,
    status: "Mới",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchCustomerById = async (id) => {
    const res = await getCustomerById(id);
    if (res) {
      const data = res.data.data;
      setBusinesses(data.businesses || []);
      setFormData((prev) => ({
        ...prev,
        cusId: data?.cusId || "",
        cusCitizenId: data.citizenId || "",
        cusName: data.firstName + " " + data.lastName || "",
        busId: data.businesses?.busId || "",
        busTaxId: data.businesses?.taxId || "",
        busName: data.businesses?.name || "",
      }));
    }
  }

  // Tính ngày kết thúc mỗi khi startDate hoặc expire thay đổi
  useEffect(() => {
    if (!formData.startDate) return;

    if (formData.expire === "vĩnh viễn") {
      setFormData((prev) => ({ ...prev, expectedEnd: "" })); // không có ngày kết thúc
      return;
    }

    const months = parseInt(formData.expire); // "12 tháng" → 12
    if (!isNaN(months)) {
      const start = new Date(formData.startDate);
      const end = new Date(start.setMonth(start.getMonth() + months));

      setFormData((prev) => ({
        ...prev,
        expectedEnd: end.toISOString().split("T")[0], // format yyyy-MM-dd
      }));
    }
  }, [formData.startDate, formData.expire]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createOrder(formData);
    console.log(res);
    if (res) {
      alert("Tạo đơn hàng thành công!");
      navigate(-1);
    } else {
      alert("Tạo đơn hàng thất bại, vui lòng thử lại!");
    }
  };

  const products = [
    { name: "COMBO MÁY POS BÁN HÀNG", price: "15.990.000 ₫" },
    { name: "Combo POS365 1 năm + 300 HĐĐT & CKS", price: "2.840.000 ₫" },
    { name: "Chữ ký số - Viettel CA", price: "Liên hệ" },
    { name: "Hóa đơn điện tử - Viettel Invoice", price: "Liên hệ" },
    { name: "POS365", price: "Liên hệ" },
    { name: "MÁY TRẠM VĂN PHÒNG HP Z2 G4 Core I5 8400 - RAM 8GB - SSD 256GB", price: "7.900.000 ₫" },
    { name: "NGĂN KÉO ĐỰNG TIỀN PA (10 NGĂN)", price: "1.150.000 ₫" },
    { name: "DELL THIẾT KẾ KHỦNG T5820", price: "16.500.000 ₫" },
    { name: "🧾 GIẤY IN NHIỆT K80x45 & K80x80", price: "Liên hệ" },
    { name: "GIẤY IN NHIỆT K57x45 & K57-38", price: "Liên hệ" },
    { name: "GIẤY IN TEM 50x30 PA 2 Lốc", price: "240.000 ₫" },
    { name: "MÁY QUÉT ĐA TIA PA", price: "2.990.000 ₫" },
    { name: "MÁY QUÉT MÃ VẠCH ĐƠN TIA DATAMAX PA – C1200", price: "1.790.000 ₫" },
    { name: "MÁY QUÉT MÃ VẠCH ĐƠN TIA PA – QW2120", price: "2.490.000 ₫" },
    { name: "NGĂN KÉO ĐỰNG TIỀN PA (4 NGĂN)", price: "750.000 ₫" },
    { name: "Máy in mã vạch GODEX G500U", price: "4.200.000 ₫" },
    { name: "🖨️ MÁY IN MÃ VẠCH XPRINTER XP-TT426B", price: "Liên hệ" },
    { name: "Máy in mã vạch HPRT HT330", price: "Liên hệ" },
    { name: "Máy in nhiệt 888BT AYIN", price: "1.790.000 ₫" },
    { name: "MÁY IN BILL ZYWEL USB +LAN", price: "1.690.000 ₫" },
    { name: "MÁY POS PAC2S", price: "4.990.000 ₫" },
    { name: "Máy D2A POS Terminal (2 màn hình)", price: "10.990.000 ₫" },
    { name: "Máy D2A POS Terminal (1 màn hình)", price: "8.800.000 ₫" },
    { name: "BỘ THIẾT BỊ THÔNG BÁO ORDER (16 THẺ)", price: "3.400.000 ₫" },
    { name: "Máy tính bàn Core i7", price: "10.990.000 ₫" },
    { name: "Bộ máy tính bàn Dell Core i5", price: "9.290.000 ₫" },
    { name: "Viettel", price: "Liên hệ" },
    { name: "EasyDocs", price: "Liên hệ" },
    { name: "EasyCA", price: "Liên hệ" },
    { name: "Viettel BHXH", price: "Liên hệ" },
    { name: "Viettel Tra cứu Hóa đơn", price: "Liên hệ" },
    { name: "easyHRM", price: "Liên hệ" },
  ];
  // Hàm format tiền
  const formatPrice = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parsePrice = (value) => {
    return value.replace(/\./g, ""); // bỏ dấu . để lưu dạng số
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-semibold">Thêm đơn hàng mới</h1>
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- Thông tin đơn hàng --- */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">📦 Thông tin đơn hàng</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Loại</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="SP">Sản phẩm</option>
                  <option value="DV">Dịch vụ</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Tên đơn hàng</label>
                <select
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    const selected = products.find(p => p.name === e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      name: selected?.name || "",
                      price: selected?.price.includes("₫") ? selected.price.replace(/[^\d]/g, "") : prev.price
                    }));
                  }}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {products.map((p, idx) => (
                    <option key={idx} value={p.name}>
                      {p.name} {p.price !== "Liên hệ" ? `- ${p.price}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* --- Thông tin KH & DN --- */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">
              👤 Thông tin khách hàng / doanh nghiệp
            </h2>

            {/* Hàng KH */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block mb-1">Mã KH</label>
                <input
                  type="text"
                  name="cusId"
                  value={formData.cusId}
                  onChange={handleChange}
                  onBlur={(e) => fetchCustomerById(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">CCCD KH</label>
                <input
                  type="text"
                  name="cusCitizenId"
                  readOnly
                  value={formData.cusCitizenId}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded cursor-not-allowed bg-gray-100"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Tên KH</label>
                <input
                  type="text"
                  name="cusName"
                  readOnly
                  value={formData.cusName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded cursor-not-allowed bg-gray-100"
                />
              </div>
            </div>

            {/* Hàng DN */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {/* Mã DN (select) */}
              <div>
                <label className="block mb-1">Mã DN</label>
                <select
                  name="busId"
                  value={formData.busId}
                  onChange={(e) => {
                    const selectedBus = businesses.find(b => b.busId === e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      busId: e.target.value,
                      busTaxId: selectedBus?.taxId || "",   // chú ý key phải đúng với backend
                      busName: selectedBus?.name || ""
                    }));
                  }}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">-- Chọn DN --</option>
                  {businesses.map((bus) => (
                    <option key={bus.busId} value={bus.busId}>
                      {bus.busId}
                    </option>
                  ))}
                </select>
              </div>

              {/* MST DN */}
              <div>
                <label className="block mb-1">MST DN</label>
                <input
                  type="text"
                  name="busTaxId"
                  value={formData.busTaxId}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>

              {/* Tên DN */}
              <div className="col-span-2">
                <label className="block mb-1">Tên DN</label>
                <input
                  type="text"
                  name="busName"
                  value={formData.busName}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>
            </div>

          </div>


          {/* --- Thời gian --- */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">⏰ Thời gian & bảo hành</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Ngày đăng ký</label>
                <input
                  type="date"
                  name="registerDate"
                  value={formData.registerDate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              {/* Ngày bắt đầu */}
              <div>
                <label className="block mb-1">Ngày bắt đầu</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Thời hạn */}
              <div>
                <label className="block mb-1">Thời hạn</label>
                <select
                  name="expire"
                  value={formData.expire}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="vĩnh viễn">Vĩnh viễn</option>
                  {Array.from({ length: 48 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} tháng
                    </option>
                  ))}
                </select>
              </div>

              {/* Dự kiến kết thúc */}
              <div>
                <label className="block mb-1">Dự kiến kết thúc</label>
                <input
                  type="date"
                  name="expectedEnd"
                  value={formData.expectedEnd}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-1">Thời gian bảo hành</label>
              <input
                type="text"
                name="guarantee"
                placeholder="VD: 12 tháng"
                value={formData.guarantee}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* --- Thanh toán --- */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">💰 Thanh toán & trạng thái</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Giá trị hợp đồng</label>
                <input
                  type="text"
                  name="price"
                  value={formatPrice(formData.price)}
                  onChange={(e) => {
                    const raw = parsePrice(e.target.value);
                    if (/^\d*$/.test(raw)) {
                      setFormData((prev) => ({ ...prev, price: raw }));
                    }
                  }}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Trạng thái thanh toán</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Chưa thanh toán">Chưa thanh toán</option>
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Thanh toán 1 phần">Thanh toán 1 phần</option>
                </select>
              </div>
              {formData.paymentStatus === "Thanh toán 1 phần" && (
                <div>
                  <label className="block mb-1">Đã thanh toán</label>
                  <input
                    type="text"
                    name="paid"
                    value={formatPrice(formData.paid)}
                    onChange={(e) => {
                      const raw = parsePrice(e.target.value);
                      if (/^\d*$/.test(raw)) {
                        setFormData((prev) => ({ ...prev, paid: raw }));
                      }
                    }}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              )}
              <div>
                <label className="block mb-1">Trạng thái đơn hàng</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Mới">Mới</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Hủy">Hủy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => navigate(-1)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Thêm đơn hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
