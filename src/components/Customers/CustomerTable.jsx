import CustomerRow from "./CustomerRow";

export default function CustomerTable({ data, startIndex, handleEdit }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border w-12 text-center">#</th>
                        <th className="p-2 border w-32">Mã KH</th>
                        <th className="p-2 border w-32">Số CCCD</th>
                        <th className="p-2 border w-32">Tên</th>
                        <th className="p-2 border w-60">Cty/Hộ KD</th>
                        <th className="p-2 border w-32">Đơn hàng</th>
                        <th className="p-2 border w-32 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ? (
                        data.map((c, index) => (
                            <CustomerRow
                                key={c.cusId || index}
                                c={c}
                                index={index}
                                startIndex={startIndex}
                                handleEdit={handleEdit}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="p-4 text-center text-gray-500">
                                Không có khách hàng nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
