export default function UsageTable({ data, handleEdit, handleDelete }) {
  return (
    <div className="border rounded-lg">
      <table className="w-full table-fixed text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 whitespace-nowrap">Mã đơn</th>
            <th className="px-3 py-2 whitespace-nowrap">Loại</th>
            <th className="px-3 py-2 whitespace-nowrap max">Tên</th>
            <th className="px-3 py-2 whitespace-nowrap">Mã KH</th>
            <th className="px-3 py-2 whitespace-nowrap">Tên KH</th>
            <th className="px-3 py-2 whitespace-nowrap">Mã DN</th>
            <th className="px-3 py-2 whitespace-nowrap">Tên DN</th>
            <th className="px-3 py-2 whitespace-nowrap">MST DN</th>
            <th className="px-3 py-2 whitespace-nowrap">Bảo hành</th>
            <th className="px-3 py-2 whitespace-nowrap">Hết hạn</th>
            <th className="px-3 py-2 whitespace-nowrap">Dự kiến kết thúc</th>
            <th className="px-3 py-2 whitespace-nowrap">Thanh toán</th>
            <th className="px-3 py-2 whitespace-nowrap">Đã trả</th>
            <th className="px-3 py-2 whitespace-nowrap">Trạng thái</th>
            <th className="px-3 py-2 whitespace-nowrap">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ordId} className="border-t hover:bg-gray-50">
              <td className="px-3 py-2 whitespace-nowrap">{item.ordId}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.type}</td>
              <td className="px-3 py-2 whitespace-nowrap max-w-[150px] truncate">{item.name}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.cusId}</td>
              <td className="px-3 py-2 whitespace-nowrap max-w-[120px] truncate">{item.cusName}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.busId}</td>
              <td className="px-3 py-2 whitespace-nowrap max-w-[150px] truncate">{item.busName}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.busTaxId}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.guarantee}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.expire || "-"}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.expectedEnd || "-"}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.paymentStatus}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.paid}</td>
              <td className="px-3 py-2 whitespace-nowrap">{item.status}</td>
              <td className="px-3 py-2 flex gap-2 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(item.ordId)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.ordId)}
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
