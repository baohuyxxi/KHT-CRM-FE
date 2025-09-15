import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerTable from "~/components/Customers/CustomerTable";
import Pagination from "~/components/Customers/Pagination";
import { getCustomers } from "~/services/customerAPI";

// Skeleton row
function TableSkeleton({ rows = 5 }) {
  return (
    <div className="animate-pulse border rounded-lg overflow-hidden">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b px-4 py-3"
        >
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/12"></div>
        </div>
      ))}
    </div>
  );
}

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await getCustomers();
      console.log(response.data);
      setCustomers(Array.isArray(response.data.data) ? response.data.data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleEdit = (id) => alert(`Chỉnh sửa khách hàng có id: ${id}`);
  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      setCustomers(customers.filter((c) => c.cusId !== id));
    }
  };
  const handleAdd = () => navigate("/customers/add");

  // Pagination
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

      {loading ? (
        <TableSkeleton rows={8} />
      ) : (
        <CustomerTable
          data={currentData}
          startIndex={startIndex}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
