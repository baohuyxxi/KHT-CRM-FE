import CustomerRow from "./CustomerRow";

export default function CustomerTable({ data, startIndex, handleEdit, handleDelete }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border w-12 text-center">#</th>
                        <th className="p-2 border w-32">Số CCCD</th>
                        <th className="p-2 border w-32">Họ</th>
                        <th className="p-2 border w-32">Tên</th>
                        <th className="p-2 border w-60">Cty/Hộ KD</th>
                        <th className="p-2 border w-32">Ngày sinh</th>
                        <th className="p-2 border w-32">Ngày tạo</th>
                        <th className="p-2 border w-24 text-center">Hoạt động</th>
                        <th className="p-2 border w-32 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((c, index) => (
                        <CustomerRow
                            key={c.id}
                            c={c}
                            index={index}
                            startIndex={startIndex}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
