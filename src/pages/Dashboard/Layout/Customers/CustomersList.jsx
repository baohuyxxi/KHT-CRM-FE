import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerTable from "~/components/Customers/CustomerTable";
import Pagination from "~/components/Customers/Pagination";

export default function CustomerList() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState(
        Array.from({ length: 55 }, (_, i) => ({
            id: i + 1,
            cccd: `CCCD${1000 + i}`,
            firstName: `Họ${i + 1}`,
            lastName: `Tên${i + 1}`,
            company: i % 2 === 0 ? `CTY Demo sjdhfkdshf sdkfgdsgfdbf sdkfjhdsf dsjfk ${i + 1}` : ``,
            dob: "1990-01-01",
            createdAt: "2024-09-01",
            active: i % 2 === 0,
        }))
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleEdit = (id) => alert(`Chỉnh sửa khách hàng có id: ${id}`);
    const handleDelete = (id) => {
        if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
            setCustomers(customers.filter((c) => c.id !== id));
        }
    };
    const handleAdd = () => navigate("/customers/add");

    // Pagination data
    const totalPages = Math.ceil(customers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = customers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Danh sách khách hàng</h1>
                <button
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
                    onClick={handleAdd}
                >
                    <Plus className="w-4 h-4" /> Thêm khách hàng
                </button>
            </div>

            <CustomerTable
                data={currentData}
                startIndex={startIndex}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
