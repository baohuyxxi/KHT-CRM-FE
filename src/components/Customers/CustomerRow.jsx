import { Pencil, Trash2, Plus, CheckCircle, XCircle } from "lucide-react";

export default function CustomerRow({ c, index, startIndex, handleEdit, handleDelete }) {
    return (
        <tr className="hover:bg-gray-50">
            {/* STT */}
            <td className="p-2 border text-center">{startIndex + index + 1}</td>

            {/* Mã KH */}
            <td className="p-2 border truncate" title={c.cusId}>
                {c.cusId}
            </td>

            {/* CCCD */}
            <td className="p-2 border truncate" title={c.citizenId}>
                {c.citizenId || "-"}
            </td>

            {/* Tên KH */}
            <td className="p-2 border truncate" title={`${c.lastName || ""} ${c.firstName || ""}`}>
                {`${c.lastName || ""} ${c.firstName || ""}`}
            </td>

            {/* Doanh nghiệp / Hộ KD */}
            <td className="p-2 border max-w-[200px]">
                <div className="flex justify-between items-center">
                    <span
                        className="truncate whitespace-nowrap overflow-hidden"
                        title={c.companyName}
                    >
                        {c.companyName || ""}
                    </span>
                    {c.companyName ? (
                        <button
                            className="ml-2 p-1 border rounded hover:bg-yellow-50 text-yellow-600 hover:text-yellow-800"
                            title="Chỉnh sửa công ty"
                            onClick={() => alert(`Chỉnh sửa công ty cho KH ${c.customerCode}`)}
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            className="ml-2 p-1 border rounded hover:bg-green-50 text-green-600 hover:text-green-800"
                            title="Tạo công ty"
                            onClick={() => alert(`Tạo công ty cho KH ${c.cusId}`)}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </td>

            {/* Trạng thái hoạt động */}
            <td className="p-2 border text-center">
                {c.active ? (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">Hoạt động</span>
                ) : (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">Ngưng</span>
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
                        onClick={() => handleDelete(c.cusId)}
                        title="Xóa"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
