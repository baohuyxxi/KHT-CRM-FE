import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function InvoiceDialog({ open, onClose, customer, orders = [] }) {
    const printRef = useRef(null);

    // ✅ State hóa đơn (dùng để chỉnh sửa tạm thời trong dialog)
    const [invoiceData, setInvoiceData] = useState({
        customer: customer || { name: "", taxId: "", address: "", phone: "" },
        items: [],
    });

    // ✅ Cập nhật khi props thay đổi
    useEffect(() => {
        if (open) {
            setInvoiceData({
                customer: customer || { name: "", taxId: "", address: "", phone: "" },
                items: orders.map((o) => ({
                    name: o.name || o.productName || "Chưa đặt tên",
                    unit: o.unit || "Cái",
                    qty: o.qty || 1,
                    price: o.price || 0,
                    note: o.note || "",
                })),
            });
        }
    }, [open, customer, orders]);

    // ✅ Chỉnh sửa thông tin khách hàng
    const handleCustomerChange = (field, value) => {
        setInvoiceData((prev) => ({
            ...prev,
            customer: { ...prev.customer, [field]: value },
        }));
    };

    // ✅ Chỉnh sửa hàng hóa
    const handleItemChange = (index, field, value) => {
        const newItems = [...invoiceData.items];
        newItems[index][field] = value;
        setInvoiceData({ ...invoiceData, items: newItems });
    };

    // ✅ Thêm hàng hóa
    const addItem = () => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [...prev.items, { name: "", unit: "", qty: 1, price: 0 }],
        }));
    };

    // ✅ In
    const handlePrint = () => (window.print(), localStorage.removeItem('orders'));

    const total = invoiceData.items.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
    );

    return (
        <>
            <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <div className="fixed inset-0 bg-black/40 print:hidden" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-4xl bg-white rounded shadow p-6 print:shadow-none overflow-y-auto max-h-[95vh]">
                            <Dialog.Title className="text-lg font-bold mb-4 print:hidden">
                                🧾 Hóa đơn bán hàng
                            </Dialog.Title>

                            {/* Form chỉnh sửa */}
                            <div className="mb-4 print:hidden">
                                <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
                                <input
                                    className="border p-1 w-full mb-1"
                                    value={invoiceData.customer.name}
                                    onChange={(e) => handleCustomerChange("name", e.target.value)}
                                    placeholder="Tên khách hàng"
                                />
                                <input
                                    className="border p-1 w-full mb-1"
                                    value={invoiceData.customer.taxCode}
                                    onChange={(e) =>
                                        handleCustomerChange("taxCode", e.target.value)
                                    }
                                    placeholder="Mã số thuế"
                                />
                                <input
                                    className="border p-1 w-full mb-1"
                                    value={invoiceData.customer.address}
                                    onChange={(e) =>
                                        handleCustomerChange("address", e.target.value)
                                    }
                                    placeholder="Địa chỉ"
                                />
                                <input
                                    className="border p-1 w-full mb-1"
                                    value={invoiceData.customer.phone}
                                    onChange={(e) =>
                                        handleCustomerChange("phone", e.target.value)
                                    }
                                    placeholder="Điện thoại"
                                />

                                <h3 className="font-semibold mt-3 mb-2">Danh sách hàng hóa</h3>
                                <table className="w-full border border-collapse text-sm mb-2">
                                    <thead>
                                        <tr>
                                            <th className="border px-1">Tên hàng</th>
                                            <th className="border px-1">ĐVT</th>
                                            <th className="border px-1">SL</th>
                                            <th className="border px-1">Đơn giá</th>
                                            <th className="border px-1">Thành tiền</th>
                                            <th className="border px-1">Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="border px-1">
                                                    <input
                                                        className="w-full"
                                                        value={item.name}
                                                        onChange={(e) =>
                                                            handleItemChange(idx, "name", e.target.value)
                                                        }
                                                    />
                                                </td>
                                                <td className="border px-1">
                                                    <input
                                                        className="w-full"
                                                        value={item.unit}
                                                        onChange={(e) =>
                                                            handleItemChange(idx, "unit", e.target.value)
                                                        }
                                                    />
                                                </td>
                                                <td className="border px-1">
                                                    <input
                                                        type="number"
                                                        className="w-full"
                                                        value={item.qty}
                                                        onChange={(e) =>
                                                            handleItemChange(idx, "qty", Number(e.target.value))
                                                        }
                                                    />
                                                </td>
                                                <td className="border px-1">
                                                    <input
                                                        type="text"
                                                        className="w-full text-right"
                                                        value={
                                                            item.price !== "" && item.price !== null && item.price !== undefined
                                                                ? Number(item.price).toLocaleString("vi-VN")
                                                                : ""
                                                        }
                                                        onChange={(e) => {
                                                            // cho phép số và dấu trừ ở đầu
                                                            const raw = e.target.value.replace(/[^0-9-]/g, "");
                                                            // nếu có nhiều dấu - thì chỉ giữ dấu - ở đầu
                                                            const normalized = raw.replace(/(?!^)-/g, "");
                                                            handleItemChange(
                                                                idx,
                                                                "price",
                                                                normalized === "-" ? "-" : normalized ? Number(normalized) : ""
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td className="border px-1 text-right">
                                                    {(item.qty * item.price).toLocaleString()}
                                                </td>
                                                <td className="border px-1">
                                                    <input
                                                        type="text"
                                                        className="w-full"
                                                        value={item.note}
                                                        onChange={(e) =>
                                                            handleItemChange(idx, "note", e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button
                                    onClick={addItem}
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    ➕ Thêm dòng
                                </button>
                            </div>

                            {/* Preview hóa đơn */}
                            <div ref={printRef} className="print-area border p-4">
                                <h1 className="text-center font-bold text-xl mb-4">
                                    HÓA ĐƠN BÁN HÀNG
                                </h1>
                                <p>
                                    <strong>Khách hàng:</strong> {invoiceData.customer.name}
                                </p>
                                <p>
                                    <strong>MST:</strong> {invoiceData.customer.taxCode}
                                </p>
                                <p>
                                    <strong>Địa chỉ:</strong> {invoiceData.customer.address}
                                </p>
                                <p>
                                    <strong>Điện thoại:</strong> {invoiceData.customer.phone}
                                </p>

                                <table className="w-full border-collapse border my-4 text-sm">
                                    <thead>
                                        <tr>
                                            <th className="border px-2 py-1">STT</th>
                                            <th className="border px-2 py-1">Tên hàng</th>
                                            <th className="border px-2 py-1">ĐVT</th>
                                            <th className="border px-2 py-1">SL</th>
                                            <th className="border px-2 py-1">Đơn giá</th>
                                            <th className="border px-2 py-1">Thành tiền</th>
                                            <th className="border px-2 py-1">Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="border px-2 text-center">{idx + 1}</td>
                                                <td className="border px-2">{item.name}</td>
                                                <td className="border px-2 text-center">{item.unit}</td>
                                                <td className="border px-2 text-center">{item.qty}</td>
                                                <td className="border px-2 text-right">
                                                    {item.price.toLocaleString()}
                                                </td>
                                                <td className="border px-2 text-right">
                                                    {(item.qty * item.price).toLocaleString()}
                                                </td>
                                                <td className="border px-2">{item.note || "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <p className="text-right font-bold">
                                    Tổng cộng: {total.toLocaleString()} VND
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 flex justify-end gap-3 print:hidden">
                                <button
                                    onClick={handlePrint}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    🖨️ In
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Đóng
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
