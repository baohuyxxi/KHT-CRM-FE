import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SelectOrdersDialog({ open, onClose, orders = [], onConfirm }) {
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [localOrders, setLocalOrders] = useState(orders);

    // toggle chọn 1 đơn hàng
    const toggleOrder = (ordId) => {
        setSelectedOrders((prev) =>
            prev.includes(ordId) ? prev.filter((id) => id !== ordId) : [...prev, ordId]
        );
    };

    // chọn tất cả
    const toggleAll = () => {
        if (allChecked) {
            setSelectedOrders([]);
            setAllChecked(false);
        } else {
            setSelectedOrders(orders.map((o) => o.ordId));
            setAllChecked(true);
        }
    };

    const handleChange = (ordId, field, value) => {
        setLocalOrders((prev) =>
            prev.map((o) =>
                o.ordId === ordId ? { ...o, [field]: value } : o
            )
        );
    };

    // thêm mặt hàng mới
    const handleAddItem = () => {
        const newItem = {
            ordId: Date.now().toString(),
            name: "Mặt hàng mới",
            qty: 1,
            price: 0,
            note: "",
        };
        setLocalOrders((prev) => [...prev, newItem]);
    };

    // nếu props orders thay đổi → sync lại
    React.useEffect(() => {
        setLocalOrders(orders);
    }, [orders]);

    const handleConfirm = () => {
        const selected = localOrders.filter((o) => selectedOrders.includes(o.ordId));
        onConfirm(selected);
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/40" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            Chọn đơn hàng để xuất hóa đơn
                        </Dialog.Title>

                        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border rounded">
                            <table className="w-full border-collapse text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-2 py-1 text-center">
                                            <input
                                                type="checkbox"
                                                checked={allChecked}
                                                onChange={toggleAll}
                                            />
                                        </th>
                                        <th className="border px-2 py-1">Tên hàng</th>
                                        <th className="border px-2 py-1">SL</th>
                                        <th className="border px-2 py-1">Đơn giá</th>
                                        <th className="border px-2 py-1">Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localOrders.map((o, idx) => (
                                        <tr key={o.ordId || idx}>
                                            <td className="border text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrders.includes(o.ordId)}
                                                    onChange={() => toggleOrder(o.ordId)}
                                                />
                                            </td>
                                            <td className="border px-2">
                                                <input
                                                    type="text"
                                                    value={o.name}
                                                    onChange={(e) =>
                                                        handleChange(o.ordId, "name", e.target.value)
                                                    }
                                                    className="w-full border rounded px-1"
                                                />
                                            </td>
                                            <td className="border px-2">
                                                <input
                                                    type="number"
                                                    value={o.qty}
                                                    onChange={(e) =>
                                                        handleChange(o.ordId, "qty", Number(e.target.value))
                                                    }
                                                    className="w-16 border rounded px-1 text-right"
                                                />
                                            </td>
                                            <td className="border px-2">
                                                <input
                                                    type="number"
                                                    value={o.price}
                                                    onChange={(e) =>
                                                        handleChange(o.ordId, "price", Number(e.target.value))
                                                    }
                                                    className="w-24 border rounded px-1 text-right"
                                                />
                                            </td>
                                            <td className="border px-2">
                                                <input
                                                    type="text"
                                                    value={o.note || ""}
                                                    onChange={(e) =>
                                                        handleChange(o.ordId, "note", e.target.value)
                                                    }
                                                    className="w-full border rounded px-1"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Thêm mặt hàng */}
                        <button
                            onClick={handleAddItem}
                            className="mt-3 px-3 py-1 bg-green-500 text-white rounded"
                        >
                            + Thêm mặt hàng
                        </button>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Xem hóa đơn
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
