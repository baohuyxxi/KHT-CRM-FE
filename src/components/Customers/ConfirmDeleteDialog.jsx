import { useState } from "react";
import { X } from "lucide-react";

export default function ConfirmDeleteDialog({ item, onConfirm, onClose }) {
    return (
        <>
            {item.businesses.length === 0 ?
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={onClose} // click ngoài đóng dialog
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 relative"
                        onClick={(e) => e.stopPropagation()} // ngăn click vào dialog đóng
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
                        <p className="mb-4">Bạn có chắc chắn muốn xóa khách hàng <span className="font-semibold">{item.firstName} {item.lastName}</span> không?</p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div> : <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={onClose} // click ngoài đóng dialog
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 relative"
                        onClick={(e) => e.stopPropagation()} // ngăn click vào dialog đóng
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Thông báo</h2>
                        <p className="mb-4 text-red-600">Khách hàng này đang có doanh nghiệp liên kết, không thể xóa!</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            }</>
    );
}
