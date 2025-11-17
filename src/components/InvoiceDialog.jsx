import React, { useState } from 'react';
import { FiTrash2, FiDownload, FiEye } from 'react-icons/fi';
import { removeInvoice, saveInvoice } from '~/services/counterAPI';
import { uploadPDF } from '~/services/uploadAPI';
import Toast from './Toast';

export default function InvoiceListDialog({ open, onClose, invoices, cusId }) {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmCode, setConfirmCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    if (!open) return null;

    const handleDownload = async (url, fileName) => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            showToast("❌ Lỗi tải xuống file!", "error");
        }
    };

    const handleDelete = (invoiceCode) => {
        setConfirmCode(invoiceCode);
        setConfirmOpen(true);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            showToast("Vui lòng chọn file PDF để tải lên!", "error");
            return;
        }

        const uploadInfo = { fileName: selectedFile.name };
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("uploadFileDto", JSON.stringify(uploadInfo));

        try {
            setLoading(true);
            const res = await uploadPDF(formData);
            const pdfUrl = res.data?.data?.url;
            if (!pdfUrl) throw new Error("Không nhận được URL từ server.");

            await saveInvoice(cusId, {
                invoiceCode: selectedFile.name,
                file: pdfUrl,
                ordIds: [],
            });
            setUploadModalOpen(false);
            setSelectedFile(null);
            setLoading(false);
            showToast("✅ Hóa đơn đã được upload thành công!", "success");
        } catch (error) {
            setLoading(false);
            showToast("❌ Upload hóa đơn thất bại. Vui lòng thử lại!", "error");
        }
    };

    return (<>
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            {/* Main dialog */}
            <div className="bg-white p-6 rounded shadow w-[500px] max-h-[80vh] overflow-y-auto relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Danh sách hóa đơn</h2>
                    <button
                        onClick={() => setUploadModalOpen(true)}
                        className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-medium rounded shadow hover:from-green-500 hover:to-green-700 hover:shadow-lg transition"
                    >
                        ⬆️ Tải hóa đơn
                    </button>
                </div>

                <ul className="space-y-2">
                    {invoices.map((inv, idx) => (
                        <li
                            key={idx}
                            className="border p-3 rounded flex justify-between items-center hover:bg-gray-50 transition"
                        >
                            <div>
                                <p className="font-medium">{inv.invoiceCode}</p>
                                {inv.issuedDate && (
                                    <p className="text-sm text-gray-500">
                                        Ngày phát hành: {inv.issuedDate}
                                    </p>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                <a
                                    href={inv.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    title="Xem PDF"
                                >
                                    <FiEye />
                                </a>

                                <button
                                    onClick={() => handleDownload(inv.file, inv.invoiceCode + '.pdf')}
                                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    title="Tải xuống PDF"
                                >
                                    <FiDownload />
                                </button>

                                <button
                                    onClick={() => handleDelete(inv.invoiceCode)}
                                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    title="Xóa"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={onClose}
                    className="mt-4 w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-center"
                >
                    Đóng
                </button>
            </div>

            {/* Upload modal */}
            {uploadModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setUploadModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-gray-800">TẢI LÊN HÓA ĐƠN</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Chọn file PDF hóa đơn bạn đã lưu để upload lên hệ thống.
                        </p>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="w-full h-12 opacity-0 cursor-pointer"
                            />
                            <p className="text-gray-500 text-sm mt-2">
                                Nhấp vào đây hoặc kéo thả file PDF
                            </p>
                            {selectedFile && (
                                <p className="mt-2 text-green-600 font-medium truncate">
                                    {selectedFile.name}
                                </p>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleUpload}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Tải lên
                            </button>
                            <button
                                onClick={() => setUploadModalOpen(false)}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm delete modal */}
            {confirmOpen && (
                <div className="confirm-bg">
                    <div className="confirm-box">
                        <p>
                            Bạn có chắc muốn xóa hóa đơn <b>{confirmCode}</b>?
                        </p>

                        <div className="confirm-actions">
                            <button
                                className="btn-cancel"
                                onClick={() => setConfirmOpen(false)}
                            >
                                Hủy
                            </button>

                            <button
                                className="btn-delete"
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        const res = await removeInvoice(cusId, confirmCode);
                                        if (res?.data) {
                                            onClose();
                                            showToast("✅ Xóa hóa đơn thành công!", "success");
                                        } else {
                                            showToast("❌ Xóa hóa đơn thất bại", "error");
                                        }
                                    } catch {
                                        showToast("❌ Xóa hóa đơn thất bại", "error");
                                    }
                                    setConfirmOpen(false);
                                    setLoading(false);
                                }}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>

                    <style>{`
                        .confirm-bg {
                            position: fixed;
                            inset: 0;
                            background: rgba(0,0,0,0.35);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            z-index: 9999;
                        }
                        .confirm-box {
                            background: white;
                            padding: 18px;
                            border-radius: 8px;
                            min-width: 280px;
                            text-align: center;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                        }
                        .confirm-actions {
                            margin-top: 15px;
                            display: flex;
                            justify-content: center;
                            gap: 10px;
                        }
                        .btn-cancel {
                            padding: 6px 14px;
                            background: #ccc;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        .btn-delete {
                            padding: 6px 14px;
                            background: #e53935;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        .btn-delete:hover {
                            background: #d32f2f;
                        }
                    `}</style>
                </div>
            )}

        </div>

        {/* Toast */}
        {toast && <Toast message={toast.message} type={toast.type} />}

        {/* Loading overlay */}
        {loading && (
            <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-lg">
                    <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>Đang xử lý...</span>
                </div>
            </div>
        )}
    </>
    );
}
