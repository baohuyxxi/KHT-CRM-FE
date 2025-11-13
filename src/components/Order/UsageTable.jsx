import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import PaginationUI from "../Pagination";
import { useState } from "react";
import ConfirmDeleteOrderDialog from "./ConfirmDeleteDialog";
import { deleteOrder } from "~/services/orderAPI";
import Toast from "../Toast";

export default function UsageTable({ data, handleEdit, currentPage, totalPages, onPageChange }) {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDel, setSelectedDel] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // auto hide sau 3s
  };

  const handleConfirmDelete = async (item) => {
    try {
      const res = await deleteOrder(item.ordId);
      if (res.status === 200) {
        setShowConfirm(false);
        showToast("Xóa đơn hàng thành công!", "success");
        // Cập nhật lại danh sách sau khi xóa
        onPageChange(1); // Quay về trang 1 sau khi xóa

      } else {
        setShowConfirm(false);
        showToast("Xóa đơn hàng thất bại!", "error");
      }
    } catch (error) {
      setShowConfirm(false);
      showToast("Đã có lỗi xảy ra khi xóa đơn hàng!", "error");
    } finally {
      setSelectedDel(null);
    }
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStatus = (dueDateStr) => {
    if (!dueDateStr) return { label: "-", color: "bg-gray-100 text-gray-600" };

    const today = new Date();
    const dueDate = new Date(dueDateStr);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30 && diffDays >= 0) {
      return {
        label: "Sắp đến hạn",
        color: "bg-orange-100 text-orange-600",
        daysLeft: diffDays
      };
    } else if (diffDays < 0) {
      return {
        label: "Đã hết hạn",
        color: "bg-red-100 text-red-600",
        daysLeft: diffDays
      };
    } else {
      return {
        label: "Hoạt động",
        color: "bg-green-100 text-green-600",
        daysLeft: diffDays
      };
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case "Chưa thanh toán":
        return { label: "Chưa thanh toán", color: "bg-red-100 text-red-600" };
      case "Đã thanh toán":
        return { label: "Đã thanh toán", color: "bg-green-100 text-green-600" };
      case "Thanh toán 1 phần":
        return { label: "Thanh toán 1 phần", color: "bg-yellow-100 text-yellow-600" };
      default:
        return { label: status || "-", color: "bg-gray-100 text-gray-600" };
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="w-full table-auto text-sm text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Mã đơn</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Loại</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Tên</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Tên KH</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Tên DN</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">MST DN</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Hết hạn</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Dự kiến hết hạn</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Thanh toán</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Trạng thái</th>
            <th className="px-3 py-2 border border-gray-300 text-center align-middle">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.ordId}
              className="hover:bg-gray-50"

            >
              <td className="px-3 py-3 border border-gray-300 text-center align-middle text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleRowClick(item)}>{item.ordId}</td>
              <td className="px-3 py-3 border border-gray-300 text-center align-middle">{item.type}</td>
              <td className="px-3 py-3 border border-gray-300 max-w-[150px]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFiles(item.files || []);
                    setShowFileDialog(true);
                  }}
                  className="block truncate text-blue-600 hover:underline text-left w-full"
                  title="Bấm để xem hồ sơ"
                >
                  {item.name}
                </button>
              </td>
              <td className="px-3 py-3 border border-gray-300 max-w-[150px]">
                <span className="block truncate" title={item.cusName}>
                  {item.cusName}
                </span>
              </td>

              <td className="px-3 py-3 border border-gray-300 max-w-[250px]">
                <span className="block truncate" title={item.busName}>
                  {item.busName}
                </span>
              </td>
              <td className="px-3 py-3 border border-gray-300 text-center align-middle">{item.busTaxId}</td>
              <td className="px-3 py-3 border border-gray-300 text-center align-middle">
                {formatDate(item.expectedEnd)}
              </td>
              <td className="px-3 py-3 border border-gray-300 text-center align-middle">
                {(() => {
                  const status = getStatus(item.expectedEnd);

                  return (
                    <div className="flex flex-col items-center">
                      <span className={`px-2 py-1 rounded ${status.color}`}>
                        {status.label}
                      </span>

                      {/* Nếu sắp đến hạn thì hiển thị còn bao nhiêu ngày */}
                      {status.label === "Sắp đến hạn" && (
                        <span className="text-xs text-gray-500 mt-1">
                          Còn {status.daysLeft} ngày
                        </span>
                      )}

                      {/* Nếu có hạn */}
                      {(status.label === "Sắp đến hạn" || status.label === "Đã hết hạn") && (
                        <button
                          onClick={() =>
                            !item.extend &&
                            navigate(`/orders/add`, { state: { item: item } })
                          }
                          disabled={item.extend} // ✅ khóa nút nếu đã gia hạn
                          className={`mt-2 px-2 py-1 rounded text-xs ${item.extend
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        >
                          {item.extend ? "Đã gia hạn" : "Gia hạn"}
                        </button>
                      )}

                      {/* Nếu không có hạn */}
                      {/* {!item.expectedEnd && (
                        <button
                          onClick={() => console.log("Mua thêm:", item.ordId)}
                          className="mt-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                        >
                          Mua thêm
                        </button>
                      )} */}
                    </div>
                  );
                })()}
              </td>

              <td className="px-3 py-3 border border-gray-300 text-center align-middle">
                {(() => {
                  const payment = getPaymentStatus(item.paymentStatus);
                  return (
                    <span className={`px-2 py-1 rounded ${payment.color}`}>
                      {payment.label}
                    </span>
                  );
                })()}
              </td>
              <td className="px-3 py-3 border border-gray-300 text-center align-middle">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                ${item.status === "Mới" ? "bg-blue-100 text-blue-700" : ""}
                ${item.status === "Đang xử lý" ? "bg-orange-100 text-orange-700" : ""}
                ${item.status === "Hoàn thành" ? "bg-green-100 text-green-700" : ""}
                ${item.status === "Hủy" ? "bg-red-100 text-red-700" : ""}
              `}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-3 py-3 border border-gray-300 text-center align-middle">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item.ordId)}
                    className="p-2 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
                    title="Sửa"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { setSelectedDel(item); setShowConfirm(true); }}
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <PaginationUI
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => onPageChange(page)}
      />
      {/* Dialog chi tiết đơn hàng */}
      <Dialog
        open={!!selectedOrder}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Chi tiết đơn hàng {selectedOrder?.ordId}
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <div style={{ lineHeight: 1.8 }}>
              <p><b>Loại:</b> {selectedOrder.type}</p>
              <p><b>Tên:</b> {selectedOrder.name}</p>
              <p><b>Khách hàng:</b> {selectedOrder.cusName}</p>
              <p><b>Doanh nghiệp:</b> {selectedOrder.busName}</p>
              <p><b>MST:</b> {selectedOrder.busTaxId || "-"}</p>
              <p><b>Ngày bắt đầu:</b> {selectedOrder.startDate}</p>
              <p><b>Dự kiến kết thúc:</b> {selectedOrder.expectedEnd}</p>
              <p><b>Giá:</b> {selectedOrder.price}</p>
              <p><b>Thanh toán:</b> {selectedOrder.paymentStatus}</p>
              <p><b>Trạng thái:</b> {selectedOrder.status}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      {showConfirm && (
        <ConfirmDeleteOrderDialog
          order={selectedDel}
          onConfirm={() => handleConfirmDelete(selectedDel)}
          onClose={() => setShowConfirm(false)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {showFileDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-auto p-5 relative">
            <h3 className="text-lg font-semibold mb-4">📎 Hồ sơ đính kèm</h3>

            {selectedFiles.length > 0 ? (
              <ul className="space-y-3">
                {selectedFiles.map((fileUrl, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border p-2 rounded bg-gray-50"
                  >
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate max-w-[70%]"
                    >
                      {fileUrl.split("/").pop()} {/* chỉ hiển thị tên file */}
                    </a>
                    <a
                      href={fileUrl}
                      download
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Tải xuống
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Không có hồ sơ nào được đính kèm.</p>
            )}

            <button
              onClick={() => setShowFileDialog(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
