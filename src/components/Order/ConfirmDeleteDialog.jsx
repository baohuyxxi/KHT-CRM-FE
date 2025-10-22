import { X } from "lucide-react";

export default function ConfirmDeleteOrderDialog({ order, onConfirm, onClose }) {
    return (
        <>
            {order.paymentStatus === "Chưa thanh toán" ? (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa đơn hàng</h2>
                        <p className="mb-4">
                            Bạn có chắc chắn muốn xóa đơn hàng{" "}
                            <span className="font-semibold text-blue-600">#{order.ordId}</span> không?
                        </p>

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
                </div>
            ) : (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Không thể xóa</h2>
                        <p className="mb-4 text-red-600">
                            Đơn hàng này đã thanh toán, không thể xóa!
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
