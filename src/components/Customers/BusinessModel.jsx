import { Dialog } from "@headlessui/react";
import { Pencil, X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteBusiness, deleteLinkedBusinesses } from "~/services/businessAPI";
import Toast from "../Toast";

export default function BusinessModal({ business, open, onClose }) {
    if (!business) return null;
    const [confirmType, setConfirmType] = useState(null); // "unlink" | "company" | null
    const [toast, setToast] = useState(null); // { message, type }
    const navigate = useNavigate();
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000); // auto hide sau 3s
    };

    const handleDelete = (type) => {
        setConfirmType(type);
    };

    const handleConfirm = async () => {
        if (confirmType === "unlink") {
            const res = await deleteLinkedBusinesses(business.busId);
            if (res) {
                showToast("Đã xóa liên kết doanh nghiệp với khách hàng");
                // onClose();
            } else {
                showToast("Xóa liên kết thất bại", "error");
            }
        }
        if (confirmType === "company") {
            // Xóa hồ sơ công ty
            const res = await deleteBusiness(business.busId);
            if (res) {
                showToast("Đã xóa hồ sơ công ty");
            } else {
                showToast("Xóa hồ sơ công ty thất bại", "error");
            }
        }
        setConfirmType(null);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <Dialog.Title className="text-xl font-semibold text-gray-800">
                                Thông tin doanh nghiệp
                            </Dialog.Title>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                            <InfoRow label="Mã DN" value={business.busId} />
                            <InfoRow label="Loại" value={business.type || "-"} />

                            <InfoRow label="Tên DN" value={business.name || "-"} />
                            <InfoRow label="Mã số thuế" value={business.taxId || "-"} />

                            <InfoRow label="Giấy phép KD" value={business.licenseCode || "-"} />
                            <InfoRow
                                label="File giấy phép"
                                value={
                                    business.licenseFile ? (
                                        <a
                                            href={business.licenseFile}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Xem file
                                        </a>
                                    ) : (
                                        "-"
                                    )
                                }
                            />

                            <InfoRow label="Đại diện" value={business.representativeName || "-"} />
                            <InfoRow label="CMND/CCCD" value={business.representativeId || "-"} />

                            <InfoRow label="Điện thoại" value={business.phone || "-"} />
                            <InfoRow label="Email" value={business.email || "-"} />

                            <InfoRow
                                label="Địa chỉ"
                                value={business.address || "-"}
                                className="col-span-2"
                            />

                            <InfoRow
                                label="Trạng thái"
                                value={
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${business.active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {business.active ? "Đang hoạt động" : "Ngưng hoạt động"}
                                    </span>
                                }
                            />

                            <InfoRow
                                label="Ngày cấp"
                                value={safeFormat(business.startDate, "dd/MM/yyyy")}
                            />

                            <InfoRow
                                label="Ngày tạo"
                                value={format(new Date(business.createdAt), "dd/MM/yyyy HH:mm")}
                            />
                            <InfoRow
                                label="Cập nhật"
                                value={format(new Date(business.updatedAt), "dd/MM/yyyy HH:mm")}
                            />
                        </div>

                        <>
                            {/* Footer */}
                            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                                <button
                                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    onClick={onClose}
                                >
                                    Đóng
                                </button>

                                <button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                                    onClick={() => navigate(`/business/edit/${business.busId}`)}
                                >
                                    <Pencil className="w-4 h-4" />
                                    Chỉnh sửa
                                </button>

                                {/* Nút Xóa */}
                                <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                                        <Trash2 className="w-4 h-4" />
                                        Xóa
                                    </Menu.Button>

                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg focus:outline-none z-50">
                                        <div className="p-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? "bg-gray-100" : ""
                                                            } flex w-full items-center px-3 py-2 text-sm text-gray-700`}
                                                        onClick={() => handleDelete("unlink")}
                                                    >
                                                        Xóa liên kết với khách hàng
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? "bg-gray-100" : ""
                                                            } flex w-full items-center px-3 py-2 text-sm text-red-600`}
                                                        onClick={() => handleDelete("company")}
                                                    >
                                                        Xóa hồ sơ công ty
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Menu>
                            </div>

                            {/* Modal confirm */}
                            {confirmType && (
                                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {confirmType === "unlink"
                                                    ? "Xác nhận xóa liên kết"
                                                    : "Xác nhận xóa hồ sơ công ty"}
                                            </h2>
                                            <button
                                                onClick={() => setConfirmType(null)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <p className="text-gray-600 mb-6">
                                            {confirmType === "unlink"
                                                ? "Bạn có chắc chắn muốn xóa liên kết doanh nghiệp này với khách hàng? Thao tác này không xóa dữ liệu công ty."
                                                : "Bạn có chắc chắn muốn xóa toàn bộ hồ sơ công ty? Hành động này không thể hoàn tác."}
                                        </p>

                                        <div className="flex justify-end gap-3">
                                            <button
                                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                onClick={() => setConfirmType(null)}
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded-lg text-white ${confirmType === "unlink"
                                                    ? "bg-orange-500 hover:bg-orange-600"
                                                    : "bg-red-500 hover:bg-red-600"
                                                    }`}
                                                onClick={handleConfirm}
                                            >
                                                {confirmType === "unlink" ? "Xóa liên kết" : "Xóa công ty"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </>
                    </Dialog.Panel>
                </div>
            </Dialog>
            {/* Toast */}
            {
                toast && (
                    <Toast message={toast.message} type={toast.type} />
                )
            }
        </>
    );
}

function InfoRow({ label, value, className = "" }) {
    return (
        <div className={`flex gap-2 ${className}`}>
            <span className="font-medium text-gray-600">{label}:</span>
            <span className="text-gray-800">{value || "-"}</span>
        </div>
    );
}

function safeFormat(date, pattern = "dd/MM/yyyy") {
    if (!date) return "-";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "-"; // nếu không hợp lệ thì trả "-"
    return format(d, pattern);
}