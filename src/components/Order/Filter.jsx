import { useState } from "react";
import { ChevronDown, ChevronRight, Search, RotateCcw } from "lucide-react";

export default function FilterPanel({ filter, setFilter, onFilter, onReset }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Header + nút bật/tắt */}
      <div
        className="flex items-center justify-between cursor-pointer bg-white px-4 py-2 border rounded shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-medium text-gray-700">Bộ lọc</h3>
        {open ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {/* Nội dung bộ lọc */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {/* Hàng 1 */}
        <div className="grid grid-cols-12 gap-3 mb-3 items-end">
          <div className="col-span-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Tìm kiếm
            </label>
            <input
              type="text"
              value={filter.search || ""}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="Mã/Tên đơn hàng/Tên tổ chức..."
              className="w-full border px-2 py-1 rounded text-sm"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Sản phẩm
            </label>
            <select
              value={filter.name || ""}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              className="w-full border px-2 py-1 rounded text-sm"
            >
              <option value="">Tất cả</option>
              <option value="Sản phẩm 1">Sản phẩm 1</option>
              <option value="Sản phẩm 2">Sản phẩm 2</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Loại đơn hàng
            </label>
            <select
              value={filter.reqType || ""}
              onChange={(e) => setFilter({ ...filter, reqType: e.target.value })}
              className="w-full border px-2 py-1 rounded text-sm"
            >
              <option value="">Tất cả</option>
              <option value="Đấu mới">Đấu mới</option>
              <option value="Gia hạn/Mua thêm">Gia hạn/Mua thêm</option>
            </select>
          </div>

          <div>
            <button
              onClick={onFilter}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              <Search className="w-4 h-4" />
              Lọc
            </button>
          </div>

          <div>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Hàng 2 */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Từ ngày
            </label>
            <input
              type="date"
              value={filter.startDate || ""}
              onChange={(e) => {
                const newStart = e.target.value;
                setFilter({
                  ...filter,
                  startDate: newStart,
                  endDate: filter.endDate || newStart,
                });
              }}
              className="w-full border px-2 py-0.5 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Đến ngày
            </label>
            <input
              type="date"
              value={filter.endDate || ""}
              min={filter.startDate || ""}
              onChange={(e) => {
                const newEnd = e.target.value;
                setFilter({
                  ...filter,
                  endDate: newEnd,
                  startDate: filter.startDate || newEnd,
                });
              }}
              className="w-full border px-2 py-0.5 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Thanh toán
            </label>
            <select
              value={filter.paymentStatus || ""}
              onChange={(e) =>
                setFilter({ ...filter, paymentStatus: e.target.value })
              }
              className="w-full border px-2 py-1 rounded text-sm"
            >
              <option value="">Tất cả</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Thanh toán 1 phần">Thanh toán 1 phần</option>
              <option value="Chưa thanh toán">Chưa thanh toán</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Trạng thái
            </label>
            <select
              value={filter.status || ""}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full border px-2 py-1 rounded text-sm"
            >
              <option value="">Tất cả</option>
              <option value="Mới">Mới</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Hủy">Hủy</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
