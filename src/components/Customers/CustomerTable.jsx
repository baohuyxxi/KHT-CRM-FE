import CustomerRow from "./CustomerRow";

export default function CustomerTable({ data, startIndex, handleEdit, handleDelete }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border w-12 text-center">#</th>
                        <th className="p-2 border w-32">Mã KH</th>
                        <th className="p-2 border w-40">Số CCCD</th>
                        <th className="p-2 border w-48">Tên KH</th>
                        <th className="p-2 border w-60">Doanh nghiệp/Hộ KD</th>
                        <th className="p-2 border w-32 text-center">Hoạt động</th>
                        <th className="p-2 border w-32 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((c, index) => (
                        <CustomerRow
                            key={c._id}
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
