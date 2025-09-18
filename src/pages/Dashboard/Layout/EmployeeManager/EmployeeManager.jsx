import { useState, useEffect } from "react";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeTable from "./EmployeeTable";
import CreateEmployeeModal from "./CreateEmployeeModal";
import { getAllEmployees } from "~/services/employee";

const ROLE_MAP = {
  "68b80a17c930100f5a6322e3": "Admin",
  "68b80a17c930100f5a6322e6": "User",
};

export default function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [filterStatus, setFilterStatus] = useState("active");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pageSize,
        status: filterStatus === "all" ? undefined : filterStatus,
        keyword: search || undefined,
      };
      const res = await getAllEmployees(params);
      const users = res.data.users.map((u) => ({
        ...u,
        roleName: ROLE_MAP[u.role] || "Unknown",
        statusLabel: u.isActive ? "Đang làm việc" : "Đã nghỉ",
        createdAtFormatted: new Date(u.createdAt).toLocaleDateString(),
      }));
      setEmployees(users);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, pageSize, filterStatus, search]);


  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
     
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryDark transition"
        >
          Tạo nhân viên
        </button>
      </div>

      {/* Filter + Search */}
      <EmployeeFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        search={search}
        setSearch={setSearch}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={employees}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        loading={loading}
      />

      {/* Create Employee Modal */}
      {showModal && (
        <CreateEmployeeModal
          onClose={() => setShowModal(false)}
          refresh={fetchEmployees}
        />
      )}
    </div>
  );
}
