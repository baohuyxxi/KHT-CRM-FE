import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function InvoiceDialog({ open, onClose, customer, orders = [] }) {
    const printRef = useRef(null);

    // ✅ State hóa đơn (dùng để chỉnh sửa tạm thời trong dialog)
    const [invoiceData, setInvoiceData] = useState({
        customer: customer || { name: "", taxId: "", address: "", phone: "" },
        items: [],
    });

    function convertNumberToWords(number) {
        if (number === 0) return "Không";
        const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
        const teens = ["mười", "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy", "mười tám", "mười chín"];
        const tens = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
        const scales = ["", "nghìn", "triệu", "tỷ"];

        function readThreeDigits(num) {
            let hundred = Math.floor(num / 100);
            let ten = Math.floor((num % 100) / 10);
            let unit = num % 10;
            let words = "";

            if (hundred > 0) {
                words += units[hundred] + " trăm";
                if (ten === 0 && unit > 0) words += " linh";
            }
            if (ten > 1) {
                words += " " + tens[ten];
                if (unit > 0) words += " " + units[unit];
            } else if (ten === 1) {
                words += " " + teens[unit];
            } else if (ten === 0 && unit > 0 && hundred === 0) {
                words += " " + units[unit];
            }

            return words.trim();
        }

        const parts = [];
        let scale = 0;
        while (number > 0) {
            const chunk = number % 1000;
            if (chunk > 0) parts.unshift(readThreeDigits(chunk) + " " + scales[scale]);
            number = Math.floor(number / 1000);
            scale++;
        }

        return parts.join(" ").replace(/\s+/g, " ").trim();
    }

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
    body * {
      visibility: hidden;
    }
    .print-area, .print-area * {
      visibility: visible;
    }
    .print-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      font-family: 'Times New Roman', Times, serif !important;
      font-size: 22px !important; /* tăng 1-2 size */
      line-height: 1.7 !important;
    }
    .print-area h1,
    .print-area h2 {
      font-size: 24px !important;
    }
    .print-area table th,
    .print-area table td {
      padding: 6px 8px !important;
      font-size: 18px !important;
    }
  }
`}</style>
<style>{`
  @media print {
    body * { visibility: hidden; }
    .print-area, .print-area * { visibility: visible; }
    .print-area { position: absolute; left: 0; top: 0; width: 100%; }
    .print-area .flex { flex-wrap: nowrap !important; }
    .print-area p, .print-area li { font-size: 17px !important; line-height: 1.4 !important; }
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
                            <div ref={printRef} className="print-area p-6 text-sm leading-6" style={{ fontFamily: "'Times New Roman', serif'" }}>
                                {/* THÔNG TIN BÊN BÁN */}
                                <div className="mb-4" style={{ fontFamily: "'Times New Roman', serif", fontSize: "16px" }}>
                                    <div className="flex justify-between items-start w-full flex-nowrap">

                                        {/* CỘT TRÁI - THÔNG TIN CÔNG TY */}
                                        <div className="w-[60%] leading-snug">
                                            <p><strong>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ KIM HỒNG THỊNH</strong></p>
                                            <p><strong>Mã số thuế:</strong> 1801784943</p>
                                            <p><strong>ĐC:</strong> C4-14, Đường 14A, KDC Hoàng Quân, P. Cái Răng, TP Cần Thơ</p>
                                            <p><strong>Điện thoại:</strong> 03.6666.0237</p>
                                            <p><strong>STK:</strong> 39791368 Ngân Hàng Quân đội - MBBank Chi nhánh Bến Tre</p>
                                        </div>

                                        {/* CỘT PHẢI - SẢN PHẨM / DỊCH VỤ */}
<div
  className="w-[38%] text-left leading-snug"
  style={{ whiteSpace: "nowrap" }}
>
  {/* TIÊU ĐỀ CHUYÊN CUNG CẤP */}
  <p className="font-bold underline text-center mb-1 justify-start">CHUYÊN CUNG CẤP:</p>

  {/* HAI CỘT NỘI DUNG */}
  <div className="flex justify-between flex-nowrap">
    {/* SẢN PHẨM */}
    <div style={{ marginRight: "20px" }}>
      <p className="font-bold underline mb-1">SẢN PHẨM:</p>
      <p>- Phần mềm giải pháp CNTT</p>
      <p>- Tư vấn kế toán dịch vụ</p>
    </div>

    {/* DỊCH VỤ */}
    <div>
      <p className="font-bold underline mb-1">DỊCH VỤ:</p>
      <p>- Tư vấn ĐK, Thành lập DN</p>
      <p>- Bảo hộ thương hiệu</p>
    </div>
  </div>
</div>
                                    </div>

                                    <hr className="my-2 border-black" />

                                    <div className="text-center">
                                        <h2 className="text-xl font-bold underline">ĐƠN HÀNG</h2>
                                    </div>
                                </div>

                                {/* THÔNG TIN KHÁCH HÀNG */}
                                <div className="mb-3">
                                    <p><strong>Khách hàng:</strong> {invoiceData.customer.name}</p>
                                    <p><strong>Mã số thuế:</strong> {invoiceData.customer.taxCode}</p>
                                    <p><strong>Địa chỉ:</strong> {invoiceData.customer.address}</p>
                                    <p><strong>Điện thoại:</strong> {invoiceData.customer.phone}</p>
                                </div>

                                {/* BẢNG HÀNG HÓA */}
                                <table className="w-full border-collapse border my-4 text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-2 py-1 w-[4%]">STT</th>
                                            <th className="border px-2 py-1">Tên hàng hóa, dịch vụ</th>
                                            <th className="border px-2 py-1 w-[8%]">ĐVT</th>
                                            <th className="border px-2 py-1 w-[8%]">Số lượng</th>
                                            <th className="border px-2 py-1 w-[15%]">Đơn giá</th>
                                            <th className="border px-2 py-1 w-[15%]">Thành tiền</th>
                                            <th className="border px-2 py-1 w-[15%]">Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="border px-2 text-center">{idx + 1}</td>
                                                <td className="border px-2">{item.name}</td>
                                                <td className="border px-2 text-center">{item.unit}</td>
                                                <td className="border px-2 text-center">{item.qty}</td>
                                                <td className="border px-2 text-right">{item.price.toLocaleString()}</td>
                                                <td className="border px-2 text-right">{(item.qty * item.price).toLocaleString()}</td>
                                                <td className="border px-2">{item.note || "-"}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={5} className="border px-2 text-right font-bold">
                                                Tổng cộng:
                                            </td>
                                            <td className="border px-2 text-right font-bold">
                                                {total.toLocaleString()} VND
                                            </td>
                                            <td className="border"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* TỔNG CỘNG BẰNG CHỮ */}
                                <p className="mt-2">
                                    <strong>Tổng cộng (bằng chữ):</strong>{" "}
                                    {convertNumberToWords(total)} đồng
                                </p>

                                {/* CHỮ KÝ */}
                                <div className="grid grid-cols-3 text-center mt-10">
                                    <div>
                                        <p className="font-semibold">Người mua hàng</p>
                                        <p className="italic">(Ký, ghi rõ họ tên)</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Người bán hàng</p>
                                        <p className="italic">(Ký, ghi rõ họ tên)</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Thủ trưởng đơn vị</p>
                                        <p className="italic">(Ký, ghi rõ họ tên)</p>
                                    </div>
                                </div>
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
