import { Pencil, Trash2, Plus, CheckCircle, XCircle } from "lucide-react";

export default function CustomerRow({ c, index, startIndex, handleEdit, handleDelete }) {
    return (
        <tr className="hover:bg-gray-50">
            <td className="p-2 border text-center">{startIndex + index + 1}</td>
            <td className="p-2 border truncate" title={c.cccd}>{c.cccd}</td>
            <td className="p-2 border truncate" title={c.firstName}>{c.firstName}</td>
            <td className="p-2 border truncate" title={c.lastName}>{c.lastName}</td>
            <td className="p-2 border max-w-[200px]">
                <div className="flex justify-between items-center">
                    <span
                        className="truncate whitespace-nowrap overflow-hidden"
                        title={c.company}
                    >
                        {c.company || ""}
                    </span>
                    {c.company ? (
                        <button
                            className="ml-2 p-1 border rounded hover:bg-yellow-50 text-yellow-600 hover:text-yellow-800"
                            title="Chỉnh sửa công ty"
                            onClick={() => alert(`Chỉnh sửa công ty cho khách hàng ${c.id}`)}
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            className="ml-2 p-1 border rounded hover:bg-green-50 text-green-600 hover:text-green-800"
                            title="Tạo công ty"
                            onClick={() => alert(`Tạo công ty cho khách hàng ${c.id}`)}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </td>
            <td className="p-2 border truncate" title={c.dob}>{c.dob}</td>
            <td className="p-2 border truncate" title={c.createdAt}>{c.createdAt}</td>
            <td className="p-2 border text-center">
                {c.active ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" title="Đang hoạt động" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-600 mx-auto" title="Ngừng" />
                )}
            </td>
            <td className="p-2 text-center border">
                <div className="flex justify-center gap-2">
                    <button
                        className="px-2 py-1 border bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => handleEdit(c.id)}
                        title="Chỉnh sửa"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        className="px-2 py-1 border bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(c.id)}
                        title="Xóa"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
