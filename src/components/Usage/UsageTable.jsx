export default function UsageTable({ data, handleEdit, handleDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStatus = (dueDateStr) => {
    if (!dueDateStr) return { label: "-", color: "bg-gray-100 text-gray-600" };

    const today = new Date();
    const dueDate = new Date(dueDateStr);

    // Tính số ngày còn lại
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30 && diffDays >= 0) {
      return { label: "Sắp đến hạn", color: "bg-orange-100 text-orange-600" };
    } else if (diffDays < 0) {
      return { label: "Đã hết hạn", color: "bg-red-100 text-red-600" };
    } else {
      return { label: "Hoạt động", color: "bg-green-100 text-green-600" };
    }
  };

  const getPaymentStatus = (status) => {
  switch (status) {
    case "Chưa thanh toán":
      return { label: "Chưa thanh toán", color: "bg-red-100 text-red-600" };
    case "Đã thanh toán":
      return { label: "Đã thanh toán", color: "bg-green-100 text-green-600" };
    case "Thanh toán 1 phần":
      return { label: "Thanh toán 1 phần", color: "bg-yellow-100 text-yellow-600" };
    default:
      return { label: status || "-", color: "bg-gray-100 text-gray-600" };
  }
};

  return (
    <div className="overflow-x-auto border rounded-lg bg-white">
      <table className="w-full table-auto text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-2 py-1 whitespace-nowrap">Mã đơn</th>
            <th className="px-2 py-1 whitespace-nowrap">Loại</th>
            <th className="px-2 py-1 whitespace-nowrap">Tên</th>
            {/* <th className="px-2 py-1 whitespace-nowrap">Mã KH</th> */}
            <th className="px-2 py-1 whitespace-nowrap">Tên KH</th>
            {/* <th className="px-2 py-1 whitespace-nowrap">Mã DN</th> */}
            <th className="px-2 py-1 whitespace-nowrap">Tên DN</th>
            <th className="px-2 py-1 whitespace-nowrap">MST DN</th>
            {/* <th className="px-2 py-1 whitespace-nowrap">Bảo hành</th> */}
            <th className="px-2 py-1 whitespace-nowrap">Hết hạn</th>
            <th className="px-2 py-1 whitespace-nowrap">Dự kiến hết hạn</th>
            {/* <th className="px-2 py-1 whitespace-nowrap">Đến hạn</th> */}
            <th className="px-2 py-1 whitespace-nowrap">Thanh toán</th>
            {/* <th className="px-2 py-1 whitespace-nowrap">Đã trả</th> */}
            <th className="px-2 py-1 whitespace-nowrap">Trạng thái</th>
            <th className="px-2 py-1 whitespace-nowrap">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ordId} className="border-t hover:bg-gray-50">
              <td className="px-2 py-1 whitespace-nowrap">{item.ordId}</td>
              <td className="px-2 py-1 whitespace-nowrap">{item.type}</td>
              <td className="px-2 py-1 whitespace-nowrap truncate">{item.name}</td>
              {/* <td className="px-2 py-1 whitespace-nowrap">{item.cusId}</td> */}
              <td className="px-2 py-1 whitespace-nowrap truncate">{item.cusName}</td>
              {/* <td className="px-2 py-1 whitespace-nowrap">{item.busId}</td> */}
              <td className="px-2 py-1 whitespace-nowrap truncate">{item.busName}</td>
              <td className="px-2 py-1 whitespace-nowrap">{item.busTaxId}</td>
              {/* <td className="px-2 py-1 whitespace-nowrap">{item.guarantee}</td> */}
              {/* <td className="px-2 py-1 whitespace-nowrap">{item.expire || "-"}</td> */}
              <td className="px-2 py-1 whitespace-nowrap">
                {formatDate(item.expectedEnd)}
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                {(() => {
                  const status = getStatus(item.expectedEnd);
                  return (
                    <span className={`px-2 py-1 rounded ${status.color}`}>
                      {status.label}
                    </span>
                  );
                })()}
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                {(() => {
                  const payment = getPaymentStatus(item.paymentStatus);
                  return (
                    <span className={`px-2 py-1 rounded ${payment.color}`}>
                      {payment.label}
                    </span>
                  );
                })()}
              </td>
              {/* <td className="px-2 py-1 whitespace-nowrap">{item.paid}</td> */}
              <td className="px-2 py-1 whitespace-nowrap">{item.status}</td>
              <td className="px-2 py-1 flex gap-2 whitespace-nowrap">
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
