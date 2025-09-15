export default function UsageTable({ data, handleEdit, handleDelete }) {
    return (
        <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-3 py-2">Tên</th>
                        <th className="px-3 py-2">CCCD KH</th>
                        <th className="px-3 py-2">Tên KH</th>
                        <th className="px-3 py-2">MST DN</th>
                        <th className="px-3 py-2">Ngày ĐK</th>
                        <th className="px-3 py-2">Ngày bắt đầu</th>
                        <th className="px-3 py-2">Hạn sử dụng</th>
                        <th className="px-3 py-2">Dự kiến hết hạn</th>
                        <th className="px-3 py-2">Giá</th>
                        <th className="px-3 py-2">Thanh toán</th>
                        <th className="px-3 py-2">Trạng thái</th>
                        <th className="px-3 py-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-t">
                            <td className="px-3 py-2">{item.name}</td>
                            <td className="px-3 py-2">{item.customerCCCD}</td>
                            <td className="px-3 py-2">{item.customerName}</td>
                            <td className="px-3 py-2">{item.companyTax}</td>
                            <td className="px-3 py-2">{item.registerDate}</td>
                            <td className="px-3 py-2">{item.startDate}</td>
                            <td className="px-3 py-2">{item.expireDate}</td>
                            <td className="px-3 py-2">{item.expectedEnd}</td>
                            <td className="px-3 py-2">{item.price}</td>
                            <td className="px-3 py-2">{item.paymentStatus}</td>
                            <td className="px-3 py-2">{item.status}</td>
                            <td className="px-3 py-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(item.id)}
                                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
