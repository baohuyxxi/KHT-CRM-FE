import { useState } from "react";
import { Search, Link2, X, Loader2 } from "lucide-react";
import { getBusinessById, linkCustomerToBusiness } from "~/services/businessAPI";
import Toast from "../Toast";

export default function LinkBusinessDialog({ cusId, onClose }) {
    const [busId, setBusId] = useState("");
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(false);
    // Hàm hiện toast
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000); // auto hide sau 3s
    }

    const handleSearch = async () => {
        if (!busId) return;
        setLoading(true);
        setLoadingSearch(true);
        try {
            const res = await getBusinessById(busId);
            if (res?.data?.data) {
                if (res.data.data.cusId) {
                    showToast(`Doanh nghiệp này đã liên kết với khách hàng ${res.data.data.cusId}!`, "error");
                } else {
                    setBusiness(res.data.data);
                }
            } else {
                showToast("Không tìm thấy doanh nghiệp!", "error");
                setBusiness(null);
            }
        } catch (err) {
            console.error(err);
            setBusiness(null);
        } finally {
            setLoading(false);
            setLoadingSearch(false);
        }
    };

    const handleLink = async () => {
        if (!business) return;
        const res = await linkCustomerToBusiness(business.busId, cusId);
        if (res.status === 200) {
            onClose();
            showToast("Liên kết khách hàng với doanh nghiệp thành công!");
        } else {
            showToast("Lỗi khi liên kết!", "error");
        }

    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={onClose} // click ngoài dialog sẽ đóng
        >
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4 relative"
                onClick={(e) => e.stopPropagation()} // ngăn click vào dialog tự đóng
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold mb-4">Liên kết doanh nghiệp</h2>

                {/* Nhập mã doanh nghiệp */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Nhập mã doanh nghiệp"
                        value={busId.toLocaleUpperCase()}
                        onChange={(e) => setBusId(e.target.value)}
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={loadingSearch}
                        className={`px-4 py-2 rounded flex items-center gap-2 ${loadingSearch
                                ? "bg-yellow-300 cursor-not-allowed text-white"
                                : "bg-yellow-500 hover:bg-yellow-600 text-white"
                            }`}
                    >
                        {loadingSearch ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Đang tìm...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                Tìm
                            </>
                        )}
                    </button>
                </div>

                {/* Hiển thị thông tin DN nếu tìm thấy */}
                {business && (
                    <div className="space-y-3 border-t pt-4">
                        <div>
                            <label className="block text-sm text-gray-600">Mã số thuế</label>
                            <input
                                type="text"
                                value={business.taxId}
                                readOnly
                                className="w-full border px-3 py-2 rounded bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600">Tên doanh nghiệp</label>
                            <input
                                type="text"
                                value={business.name}
                                readOnly
                                className="w-full border px-3 py-2 rounded bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600">Loại hình</label>
                            <input
                                type="text"
                                value={business.type}
                                readOnly
                                className="w-full border px-3 py-2 rounded bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600">Địa chỉ</label>
                            <input
                                type="text"
                                value={business.address}
                                readOnly
                                className="w-full border px-3 py-2 rounded bg-gray-100"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleLink}
                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                            >
                                <Link2 className="w-4 h-4" />
                                Xác nhận liên kết
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
}
