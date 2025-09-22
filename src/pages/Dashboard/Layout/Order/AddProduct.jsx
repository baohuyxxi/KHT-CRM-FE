import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Toast from "~/components/Toast";
import { getCustomerById } from "~/services/customerAPI";
import { createOrder, extendOrder, getOrderById, updateOrder } from "~/services/orderAPI";

export default function AddOrder() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [toast, setToast] = useState(null);
  const [selectedBus, setSelectedBus] = useState([]);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // auto hide sau 3s
  };
  const [loadingButton, setLoadingButton] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    reqType: "",
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
    expire: "Không có",
    expectedEnd: "",
    price: "",
    paymentStatus: "Chưa thanh toán",
    paid: 0,
    status: "Mới",
  });

  const { id } = useParams();
  const { state } = useLocation();
  const fetchOrder = async (id) => {
    const res = await getOrderById(id);
    if (res) {
      const data = res.data.data;
      setFormData({
        ...data,
        startDate: data.startDate ? data.startDate.split("T")[0] : "",
        expectedEnd: data.expectedEnd ? data.expectedEnd.split("T")[0] : "",
        registerDate: data.registerDate ? data.registerDate.split("T")[0] : "",
      });
      setBusinesses([{ cusId: data.cusId, busId: data.busId, busTaxId: data.busTaxId, busName: data.busName, cusCitizenId: data.cusCitizenId }]); // mảng doanh nghiệp liên quan
    }
  };



  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
    if (state && state.item) {
      const item = state.item;
      setFormData((prev) => ({
        ...prev,
        cusId: item.cusId || "",
        cusCitizenId: item.cusCitizenId || "",
        cusName: item.cusName || "",
        busId: item.busId || "",
        busTaxId: item.busTaxId || "",
        busName: item.busName || "",
        type: item.type || "",
        name: item.name || "",
        price: item.price || "",
        reqType: "Gia hạn/Mua thêm",
        startDate: null,
        registerDate: new Date().toISOString().split("T")[0],
        expectedEnd: null,
        expire: item.expire || "Không có",
        guarantee: item.guarantee || "",
        paymentStatus: "Chưa thanh toán",
        paid: item.paid || 0,
        status: "Mới",
      }));
      setBusinesses([{ cusId: item.cusId, busId: item.busId, busTaxId: item.busTaxId, busName: item.busName, cusCitizenId: item.cusCitizenId }]); // mảng doanh nghiệp liên quan

    }
  }, [id]);

  // --- danh sách sản phẩm ---
  const products = [
    { name: "COMBO MÁY POS BÁN HÀNG", price: "15990000" },
    { name: "Combo POS365 1 năm + 300 HĐĐT & CKS", price: "2840000" },
    { name: "Chữ ký số - Viettel CA", price: "" },
    { name: "Hóa đơn điện tử - Viettel Invoice", price: "" },
    { name: "POS365", price: "" },
    { name: "MÁY TRẠM VĂN PHÒNG HP Z2 G4 Core I5 8400 - RAM 8GB - SSD 256GB", price: "7900000" },
    { name: "NGĂN KÉO ĐỰNG TIỀN PA (10 NGĂN)", price: "1150000" },
    { name: "DELL THIẾT KẾ KHỦNG T5820", price: "16500000" },
    { name: "🧾 GIẤY IN NHIỆT K80x45 & K80x80", price: "" },
    { name: "GIẤY IN NHIỆT K57x45 & K57-38", price: "" },
    { name: "GIẤY IN TEM 50x30 PA 2 Lốc", price: "240000" },
    { name: "MÁY QUÉT ĐA TIA PA", price: "2990000" },
    { name: "MÁY QUÉT MÃ VẠCH ĐƠN TIA DATAMAX PA – C1200", price: "1790000" },
    { name: "MÁY QUÉT MÃ VẠCH ĐƠN TIA PA – QW2120", price: "2490000" },
    { name: "NGĂN KÉO ĐỰNG TIỀN PA (4 NGĂN)", price: "750000" },
    { name: "Máy in mã vạch GODEX G500U", price: "4200000" },
    { name: "🖨️ MÁY IN MÃ VẠCH XPRINTER XP-TT426B", price: "" },
    { name: "Máy in mã vạch HPRT HT330", price: "" },
    { name: "Máy in nhiệt 888BT AYIN", price: "1790000" },
    { name: "MÁY IN BILL ZYWEL USB +LAN", price: "1690000" },
    { name: "MÁY POS PAC2S", price: "4990000" },
    { name: "Máy D2A POS Terminal (2 màn hình)", price: "10990000" },
    { name: "Máy D2A POS Terminal (1 màn hình)", price: "8800000" },
    { name: "BỘ THIẾT BỊ THÔNG BÁO ORDER (16 THẺ)", price: "3400000" },
    { name: "Máy tính bàn Core i7", price: "10990000" },
    { name: "Bộ máy tính bàn Dell Core i5", price: "9290000" },
    { name: "Viettel", price: "" },
    { name: "EasyDocs", price: "" },
    { name: "EasyCA", price: "" },
    { name: "Viettel BHXH", price: "" },
    { name: "Viettel Tra cứu Hóa đơn", price: "" },
    { name: "easyHRM", price: "" },
  ];

  // --- hàm format giá ---
  const formatPrice = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // --- hàm parse giá về số ---
  const parsePrice = (value) => value.replace(/\./g, "");

  // --- handle change chung ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchCustomerById = async (id) => {
    const res = await getCustomerById(id);
    if (res) {
      const data = res.data.data;
      const firstBus = data.businesses?.[0] || {}; // chọn DN đầu tiên

      setBusinesses(data.businesses || []);
      setFormData((prev) => ({
        ...prev,
        cusId: data?.cusId || "",
        cusCitizenId: data.citizenId || "",
        cusName: (data.firstName + " " + data.lastName) || "",
        busId: firstBus.busId || "",
        busTaxId: firstBus.taxId || "",
        busName: firstBus.name || "",
      }));
      setSelectedBus(firstBus); // object chứ không phải mảng
    }
  };

  // --- tính expectedEnd ---
  useEffect(() => {
    if (!formData.startDate) return;
    if (formData.expire === "Vĩnh viễn" || formData.expire === "Không có") {
      setFormData((prev) => ({ ...prev, expectedEnd: "" }));
      return;
    }

    const months = parseInt(formData.expire);
    if (!isNaN(months)) {
      const start = new Date(formData.startDate);
      const end = new Date(start.setMonth(start.getMonth() + months));
      setFormData((prev) => ({
        ...prev,
        expectedEnd: end.toISOString().split("T")[0],
      }));
    }
  }, [formData.startDate, formData.expire]);

  // --- submit form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    try {
      if (id) {
        const res = await updateOrder(id, formData);
        if (res) {
          showToast("Cập nhật đơn hàng thành công!");
        } else {
          showToast("Cập nhật đơn hàng thất bại, vui lòng thử lại!", "error");
        }
      } else if (state && state?.item) {
        const res = await extendOrder(state?.item.ordId, formData);
        if (res) {
          showToast("Gia hạn/Mua thêm đơn hàng thành công!");
        } else {
          showToast("Gia hạn/Mua thêm đơn hàng thất bại, vui lòng thử lại!", "error");
        }
      } else {
        const res = await createOrder(formData);
        if (res) {
          showToast("Tạo đơn hàng thành công!");

        } else {
          showToast("Tạo đơn hàng thất bại, vui lòng thử lại!", "error");
        }
      }
    } catch (error) {
      showToast("Có lỗi xảy ra, vui lòng thử lại!", "error");
    } finally {
      setLoadingButton(false);
    }

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

        <div className="space-y-6">
          {/* --- thông tin đơn hàng --- */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">📦 Thông tin đơn hàng</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <label className="block mb-1">Loại</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                  disabled={!!state?.item} // ✅ thay cho readOnly
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="SP">Sản phẩm</option>
                  <option value="DV">Dịch vụ</option>
                </select>
              </div>
              <div className="col-span-3">
                <label className="block mb-1">Loại yêu cầu</label>
                <select
                  name="reqType"
                  value={formData.reqType}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                  disabled={!!state?.item} // ✅ thay cho readOnly
                >
                  <option value="">-- Chọn loại yêu cầu --</option>
                  <option value="Đấu mới">Đấu mới</option>
                  <option value="Gia hạn/Mua thêm">Gia hạn/Mua thêm</option>
                </select>
              </div>
              <div className="col-span-6">
                <label className="block mb-1">Tên đơn hàng</label>
                <select
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    const selected = products.find((p) => p.name === e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      name: selected?.name || "",
                      price: selected?.price || prev.price,
                    }));
                  }}
                  className="w-full border px-3 py-2 rounded"
                  required
                  disabled={!!state?.item} // ✅ thay cho readOnly
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {products.map((p, idx) => (
                    <option key={idx} value={p.name}>
                      {p.name} {p.price ? `- ${formatPrice(p.price)} ₫` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* --- thông tin khách hàng & DN --- */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">👤 Thông tin khách hàng / doanh nghiệp</h2>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block mb-1">Mã KH</label>
                <input
                  type="text"
                  name="cusId"
                  value={formData.cusId}
                  onChange={handleChange}
                  onBlur={(e) => state?.item ? null : fetchCustomerById(e.target.value)}
                  className={state?.item ? "w-full border px-3 py-2 rounded  bg-gray-100 cursor-not-allowed" : "w-full border px-3 py-2 rounded"}
                  required
                  readOnly={!!state?.item} // ✅ không cho sửa nếu có state item
                />
              </div>
              <div>
                <label className="block mb-1">CCCD KH</label>
                <input
                  type="text"
                  name="cusCitizenId"
                  value={formData.cusCitizenId}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Tên KH</label>
                <input
                  type="text"
                  name="cusName"
                  value={formData.cusName}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block mb-1">Mã DN</label>
                <select
                  name="busId"
                  value={formData.busId}
                  onChange={(e) => {
                    const selected = businesses.find(b => b.busId === e.target.value);
                    setSelectedBus(selected || {});
                    setFormData((prev) => ({
                      ...prev,
                      busId: selected?.busId || "",
                      cusCitizenId: selected?.cusCitizenId || "",
                      busTaxId: selected?.busTaxId || "",   // thêm dòng này
                      busName: selected?.name || "",
                    }));
                  }}
                  className="w-full border px-3 py-2 rounded"
                  disabled={!!state?.item} // ✅ thay cho readOnly
                >
                  <option value="">-- Chọn DN --</option>
                  {businesses.map((bus) => (
                    <option key={bus.busId} value={bus.busId}>{bus.busId}</option>
                  ))}
                </select>
              </div>
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

          {/* --- thời gian & bảo hành --- */}
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
              <div>
                <label className="block mb-1">Thời hạn</label>
                <select
                  name="expire"
                  value={formData.expire}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Không có">Không có</option>
                  <option value="Vĩnh viễn">Vĩnh viễn</option>
                  {Array.from({ length: 48 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} tháng</option>
                  ))}
                </select>
              </div>
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
                value={formData.guarantee}
                onChange={handleChange}
                placeholder="VD: 12 tháng"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* --- thanh toán --- */}
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
                    if (/^\d*$/.test(raw)) setFormData(prev => ({ ...prev, price: raw }));
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
                      if (/^\d*$/.test(raw)) setFormData(prev => ({ ...prev, paid: raw }));
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

          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => navigate(-1)} > Hủy </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loadingButton} // disable khi loading
              className={`px-4 py-2 rounded text-white ${loadingButton ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loadingButton
                ? "Đang xử lý..."
                : id
                  ? "Cập nhật đơn hàng"
                  : state && state?.item
                    ? "Gia hạn/Mua thêm"
                    : "Thêm đơn hàng"}
            </button>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
