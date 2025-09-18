import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, FileText, Upload, CheckCircle, XCircle } from "lucide-react";
import { getAllBusinesses } from "~/services/businessAPI";

export default function BusinessList() {
  const navigate = useNavigate();

  // Fake dữ liệu doanh nghiệp
  const [businesses, setBusinesses] = useState([])

  const fetchBusinesses = async () => {
    const businessData = await getAllBusinesses();
    setBusinesses(businessData.data.data);
  }

  useEffect(() => {
    fetchBusinesses();
  }, []);


  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(businesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBusinesses = businesses.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa doanh nghiệp này?")) {
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleEdit = (id) => navigate(`/business/edit/${id}`, { state: { id: id } });

  const handleUpload = (id) => {
    alert(`Upload PDF cho doanh nghiệp ID: ${id}`);
    // Ở đây bạn có thể mở modal upload file thực tế
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách doanh nghiệp</h1>
        <button
          onClick={() => navigate("/business/add")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm doanh nghiệp
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-[1000px] w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border text-center">STT</th>
              <th className="p-2 border">Loại</th>
              <th className="p-2 border">MST</th>
              <th className="p-2 border">GPKD</th>
              <th className="p-2 border max-w-[250px]">Tên doanh nghiệp</th>
              <th className="p-2 border max-w-[200px]">Người đại diện</th>
              <th className="p-2 border text-center">Trạng thái</th>
              <th className="p-2 border text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBusinesses.map((b, index) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-2 border text-center">{startIndex + index + 1}</td>
                <td className="p-2 border">{b.type}</td>
                <td className="p-2 border">{b.taxId == '' ? "-" : b.taxId}</td>
                <td className="p-2 border">
                  <div className="flex justify-between items-center">
                    <span>{b.licenseCode == '' ? "-" : b.licenseCode}</span>
                    {b.licenseFile ? (
                      <a
                        href={b.licenseFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 px-2 py-1 border rounded bg-gray-50 text-blue-600 hover:bg-gray-100 flex items-center gap-1"
                        title="Xem file GPKD"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => handleUpload(b.busId)}
                        className="ml-3 px-2 py-1 border rounded bg-gray-50 text-orange-600 hover:bg-gray-100 flex items-center gap-1"
                        title="Tải file GPKD"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-2 border truncate max-w-[250px]" title={b.name}>
                  {b.name}
                </td>
                <td className="p-2 border truncate max-w-[200px]" title={b.cusInfo?.lastName}>
                  {b.cusInfo == null ? "-" : b.cusInfo.lastName}
                </td>
                <td className="p-2 border text-center">
                  {b.active ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" title="Đang hoạt động" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mx-auto" title="Ngừng hoạt động" />
                  )}
                </td>
                <td className="p-2 text-center border">
                  <div className="flex justify-center gap-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center border bg-gray-100 rounded hover:bg-gray-200"
                      onClick={() => handleEdit(b.busId)}
                      title="Chỉnh sửa"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center border bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(b.busId)}
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
