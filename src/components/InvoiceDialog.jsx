import React from 'react';
import { FiTrash2, FiDownload, FiEye } from 'react-icons/fi';
import { removeInvoice } from '~/services/counterAPI';
import { useState } from 'react';
import { uploadPDF } from '~/services/uploadAPI';
import { saveInvoice } from '~/services/counterAPI';


export default function InvoiceListDialog({
    open,
    onClose,
    invoices,
    cusId
}) {
    if (!open) return null;
    const handleDownload = async (url, fileName) => {
        try {
            const res = await fetch(url, { method: 'GET' });
            const blob = await res.blob(); // lấy dữ liệu PDF
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName; // tên file khi tải về
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Download failed', err);
        }
    };
    const handleDelete = async (invoiceCode) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa hóa đơn ${invoiceCode}?`)) {
            const res = await removeInvoice(cusId, invoiceCode);
            if (res && res.data) {
                alert('Xóa hóa đơn thành công');
                onClose(); // Đóng dialog sau khi xóa
            } else {
                alert('Xóa hóa đơn thất bại');
            }
        }
    };
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Vui lòng chọn file PDF để tải lên!");
            return;
        }

        const uploadInfo = {
            fileName: selectedFile.name
        };

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("uploadFileDto", JSON.stringify(uploadInfo));
        try {
            const res = await uploadPDF(formData);
            const pdfUrl = res.data?.data?.url;
            if (!pdfUrl) throw new Error("Không nhận được URL từ server.");
            const ordIds = [];
            // Lưu URL hóa đơn vào hệ thống
            await saveInvoice(cusId, {
                invoiceCode: selectedFile.name,
                file: pdfUrl,
                ordIds: ordIds,
            }
            );
            alert("✅ Hóa đơn đã được upload thành công!");
            setUploadModalOpen(false);
            setSelectedFile(null);
        } catch (error) {
            console.error("❌ Lỗi upload:", error);
            alert("Upload thất bại. Vui lòng thử lại!");
        }
    };

    const handleUploadClick = () => {
        setUploadModalOpen(true);
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow w-[500px] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Danh sách hóa đơn</h2>
                    <button
                        onClick={handleUploadClick}
                        className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-medium rounded shadow hover:from-green-500 hover:to-green-700 hover:shadow-lg transition"
                    >
                        ⬆️ Tải hóa đơn
                    </button>
                </div>
                <ul className="space-y-2">
                    {invoices.map((inv, index) => (
                        <li
                            key={index}
                            className="border p-3 rounded flex justify-between items-center hover:bg-gray-50 transition"
                        >
                            <div>
                                <p className="font-medium">{inv.invoiceCode}</p>
                                {inv.issuedDate && <p className="text-sm text-gray-500">Ngày phát hành: {inv.issuedDate}</p>}
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
            {uploadModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md md:max-w-lg p-6 md:p-8 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setUploadModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        {/* Header */}
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">TẢI LÊN HÓA ĐƠN</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Chọn file PDF hóa đơn bạn đã lưu để upload lên hệ thống.
                        </p>

                        {/* Input file */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="w-full h-12 opacity-0 cursor-pointer"
                            />
                            <p className="text-gray-500 text-sm mt-2">Nhấp vào đây hoặc kéo thả file PDF</p>
                            {selectedFile && (
                                <p className="mt-2 text-green-600 font-medium truncate">{selectedFile.name}</p>
                            )}
                        </div>

                        {/* Buttons */}
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
        </div>
    );
}
