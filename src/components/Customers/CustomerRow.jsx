import { Pencil, Trash2, Plus, Building2 } from "lucide-react";
import { Menu } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessModal from "./BusinessModel";
import Toast from "../Toast";
import LinkBusinessDialog from "./LinkBusiness";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { deleteCustomer } from "~/services/customerAPI";

export default function CustomerRow({ c, index, startIndex, handleEdit }) {
    const [open, setOpen] = useState(false);
    const [selectedCusId, setSelectedCusId] = useState(null);
    const [selectedDel, setSelectedDel] = useState(null);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    // Link business dialog
    const [toast, setToast] = useState(null);
    // Hàm hiện toast
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000); // auto hide sau 3s
    };
    const [showDialog, setShowDialog] = useState(false);

    const hasImages = c.frontCitizenId && c.backCitizenId;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleConfirmDelete = async () => {
        if (!selectedDel) return;
        try {
            const res = await deleteCustomer(selectedDel.cusId); // gọi API xóa
            if (res.status === 200) {
                setDeleteDialogOpen(false);
                // setCustomers((prev) => prev.filter((c) => c.cusId !== selectedDel.cusId)); // cập nhật lại danh sách
                showToast("Xóa khách hàng thành công");
            } else {
                setDeleteDialogOpen(false);
                showToast("Lỗi khi xóa khách hàng!", "error");
            }
        } catch (err) {
            setDeleteDialogOpen(false);
            showToast("Lỗi khi xóa khách hàng!", "error");
        } finally {
            setSelectedDel(null);
        }
    };

    const handleDeleteClick = (customer) => {
        setSelectedDel(customer);
        setDeleteDialogOpen(true);
    };

    const handleOpenModal = (cusId) => {
        setSelectedCusId(cusId);
        setOpen(true);
    };

    return (
        <><>
            <tr className="hover:bg-gray-50">
                {/* STT */}
                <td className="p-2 border text-center">{startIndex + index + 1}</td>

                {/* Mã KH */}
                <td className="p-2 border truncate" title={c.cusId}>
                    {c.cusId}
                </td>

                {/* CỘT CCCD */}
                <td
                    className={`p-2 border truncate ${hasImages ? "text-blue-600 cursor-pointer underline" : ""}`}
                    title={hasImages ? "Xem hình CCCD" : c.citizenId}
                    onClick={() => hasImages && setShowDialog(true)}
                >
                    {c.citizenId || "-"}
                </td>

                {/* Tên KH */}
                <td className="p-2 border truncate" title={`${c.firstName || ""} ${c.lastName || ""}`}>
                    {`${c.firstName || ""} ${c.lastName || ""}`.trim() || "-"}
                </td>

                {/* Doanh nghiệp / Hộ KD */}
                <td className="p-2 border max-w-[200px]">
                    <div className="flex flex-col gap-1">
                        {Array.isArray(c.businesses) && c.businesses.length > 0 ? (
                            c.businesses.map((b, index) => (
                                <div
                                    key={b.busId}
                                    className="flex justify-between items-center"
                                >
                                    {/* 👇 Tên doanh nghiệp thành link mở form */}
                                    <button
                                        className="truncate whitespace-nowrap overflow-hidden text-blue-600 hover:underline text-left"
                                        title={b.name}
                                        onClick={() => handleOpenModal(c.businesses[index])} // 👈 hàm mở form
                                    >
                                        {b.name || "-"}
                                    </button>

                                    <button
                                        className="ml-2 p-1 border rounded hover:bg-yellow-50 text-yellow-600 hover:text-yellow-800"
                                        title="Chỉnh sửa công ty"
                                        onClick={() => navigate(`/business/edit/${b.busId}`, { state: { id: b.busId } })}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-between items-center">
                                <span>-</span>
                                <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button
                                        className="ml-2 p-1 border rounded hover:bg-green-50 text-green-600 hover:text-green-800 flex items-center gap-1"
                                        title="Thêm doanh nghiệp"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Menu.Button>

                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg focus:outline-none z-50">
                                        <div className="p-1">
                                            {/* Chọn từ hệ thống */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? "bg-gray-100" : ""} flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700`}
                                                        onClick={() => {
                                                            setOpenDialog(true);
                                                        }}
                                                    >
                                                        <Building2 className="w-4 h-4" />
                                                        Liên kết DN có sẵn
                                                    </button>
                                                )}
                                            </Menu.Item>

                                            {/* Tạo mới */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? "bg-gray-100" : ""} flex w-full items-center gap-2 px-3 py-2 text-sm text-green-600`}
                                                        onClick={() => navigate("/business/add", { state: { cusId: c.cusId } })}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        Tạo DN mới
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Menu>
                                {openDialog && (
                                    <LinkBusinessDialog
                                        cusId={c.cusId}
                                        onClose={() => setOpenDialog(false)} // đóng dialog
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </td>


                {/* Trạng thái hoạt động */}
                <td className="p-2 border text-center">
                    {c.orders && c.orders.length > 0 ? (
                        <button
                            onClick={() => {
                                navigate(`/customers/${c.cusId}/orders`, {
                                    state: { cus: c.businesses },
                                })
                            }}
                            className="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Xem đơn hàng
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate(`/orders/add`, { state: { cusId: c.cusId } })}
                            className="px-2 py-1 text-xs rounded bg-orange-500 text-white hover:bg-orange-600"
                        >
                            Tạo đơn hàng
                        </button>

                    )}
                </td>

                {/* Hành động */}
                <td className="p-2 text-center border">
                    <div className="flex justify-center gap-2">
                        <button
                            className="px-2 py-1 border bg-gray-100 rounded hover:bg-gray-200"
                            onClick={() => handleEdit(c.cusId)}
                            title="Chỉnh sửa"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            className="px-2 py-1 border bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDeleteClick(c)}
                            title="Xóa"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr >
            {deleteDialogOpen && (
                <ConfirmDeleteDialog
                    item={selectedDel}
                    onConfirm={handleConfirmDelete}
                    onClose={() => setDeleteDialogOpen(false)}
                />
            )}
        </>

            {/* Gắn modal */}
            {toast && <Toast message={toast.message} type={toast.type} />}
            {open && (
                <BusinessModal
                    business={selectedCusId}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            )}
            {/* DIALOG XEM HÌNH CCCD */}
            {showDialog && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowDialog(false)} // click nền đen để đóng
                >
                    <div
                        className="bg-white rounded-lg p-4 max-w-2xl w-full relative"
                        onClick={(e) => e.stopPropagation()} // ngăn đóng khi click vào dialog
                    >
                        <button
                            onClick={() => setShowDialog(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            ✖
                        </button>

                        <h3 className="text-lg font-semibold mb-4 text-center">
                            Hình ảnh Căn cước công dân
                        </h3>

                        <div className="flex gap-4 justify-center">
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500 mb-1">Mặt trước</p>
                                <img
                                    src={c.frontCitizenId}
                                    alt="CCCD mặt trước"
                                    className="w-64 h-40 object-cover border rounded"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500 mb-1">Mặt sau</p>
                                <img
                                    src={c.backCitizenId}
                                    alt="CCCD mặt sau"
                                    className="w-64 h-40 object-cover border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
