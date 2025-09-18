import { Dialog } from "@headlessui/react";
import { Pencil, X } from "lucide-react";
import { format } from "date-fns";

export default function BusinessModal({ business, open, onClose }) {
    if (!business) return null;
    console.log("Business data:", business);

    return (
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
                            onClick={() => alert(`Chỉnh sửa DN ${business.busId}`)}
                        >
                            <Pencil className="w-4 h-4" />
                            Chỉnh sửa
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
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