import { Dialog } from "@headlessui/react";
import { Pencil, X } from "lucide-react";
import { format } from "date-fns";

export default function CustomerModal({ customer, open, onClose }) {
    if (!customer) return null;

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <Dialog.Title className="text-xl font-semibold text-gray-800">
                            Thông tin khách hàng
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
                        <InfoRow label="Mã KH" value={customer.cusId} />
                        <InfoRow label="Loại KH" value={customer.customerType || "-"} />

                        <InfoRow label="Họ tên" value={`${customer.firstName} ${customer.lastName}`} />
                        <InfoRow label="Giới tính" value={customer.gender || "-"} />

                        <InfoRow
                            label="Ngày sinh"
                            value={customer.dob ? format(new Date(customer.dob), "dd/MM/yyyy") : "-"}
                        />
                        <InfoRow label="Số CMND/CCCD" value={customer.citizenId || "-"} />

                        <InfoRow label="Số điện thoại" value={customer.phone || "-"} />
                        <InfoRow label="Email" value={customer.email || "-"} />

                        <InfoRow label="Địa chỉ" value={customer.address || "-"} className="col-span-2" />

                        <InfoRow
                            label="Trạng thái"
                            value={
                                <span
                                    className={`px-2 py-1 rounded text-xs ${customer.active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {customer.active ? "Đang hoạt động" : "Ngưng hoạt động"}
                                </span>
                            }
                        />
                        <div>
                            <InfoRow
                                label="Ngày tạo"
                                value={format(new Date(customer.createdAt), "dd/MM/yyyy HH:mm")}
                            />
                            <InfoRow
                                label="Cập nhật"
                                value={format(new Date(customer.updatedAt), "dd/MM/yyyy HH:mm")}
                            /></div>
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
                            onClick={() => alert(`Chỉnh sửa khách hàng ${customer.cusId}`)}
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

/* Subcomponent cho row thông tin */
function InfoRow({ label, value, className = "" }) {
    return (
        <div className={`flex gap-2 ${className}`}>
            <span className="font-medium text-gray-600">{label}:</span>
            <span className="text-gray-800">{value || "-"}</span>
        </div>
    );
}