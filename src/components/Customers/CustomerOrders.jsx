import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import UsageTable from "~/components/Order/UsageTable";
import { getOrdersByCustomerId } from "~/services/orderAPI";
import InvoiceDialog from "../exportPDF";
import SelectOrdersDialog from "../SelectOrdersDialog";


export default function CustomerUsage() {
  const navigate = useNavigate();
  const { id } = useParams(); // đổi từ cusId -> id
  const [products, setProducts] = useState([]);
  const limit = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openSelect, setOpenSelect] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [prods, setProds] = useState([]); // danh sách sản phẩm đã chọn để xuất hóa đơn
  const location = useLocation();
  const { cus } = location.state || {};
  const [customer, setCustomer] = useState(cus || {});

  const handleConfirmOrders = (orders) => {
    setSelectedOrders(orders);
    setOpenSelect(false);
    setOpenInvoice(true); // mở hóa đơn luôn sau khi chọn
  };

  const fetchOrders = async () => {
    const res = await getOrdersByCustomerId(id, currentPage, limit); // truyền id vào API
    if (res && res.data) {
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
      setProds(res.data.data.map(order => ({
        ordId: order.ordId,
        name: order.name,
        qty: 1,
        price: order.price,
        note: ""
      })));
      const foundIndex = cus.findIndex(b => b.busId === res.data.data[0].busId);
      if (foundIndex !== -1) {
        setCustomer({
          name: cus[foundIndex].name,
          taxId: cus[foundIndex].taxId,
          address: cus[foundIndex].address,
          phone: cus[foundIndex].phone,
        });
      }
    }
  };

  useEffect(() => {
    fetchOrders();


  }, [currentPage]);

  const handleAddProduct = () => navigate(`/orders/add?type=SP&cusId=${id}`, { state: { cusId: id } });

  const handleEdit = (ordId, type) =>
    navigate(`/orders/edit/${ordId}`, { state: { ordId, type } });

  const handleDelete = (ordId, type) => {
    if (confirm(`Bạn có chắc muốn xóa ${type} này?`)) {
      setProducts(products.filter((p) => p.ordId !== ordId));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Sản phẩm & Dịch vụ Khách hàng sử dụng</h1>
        <div className="p-6">
          <button
            onClick={() => setOpenSelect(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Xuất hóa đơn
          </button>

          {/* Dialog chọn đơn hàng */}
          <SelectOrdersDialog
            open={openSelect}
            onClose={() => setOpenSelect(false)}
            orders={prods}
            onConfirm={handleConfirmOrders}
          />

          {/* Dialog xem/in hóa đơn */}
          <InvoiceDialog
            open={openInvoice}
            onClose={() => setOpenInvoice(false)}
            customer={customer}
            orders={selectedOrders}
            template={3} // A5 chẳng hạn
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus className="w-4 h-4" /> Thêm sản phẩm
        </button>
      </div>
      <div className="mb-4">
        <div className="overflow-x-auto w-full max-w-[1200px] mx-auto">
          <div className="w-[1500px]">
            <UsageTable
              data={products}
              handleEdit={(ordId) => handleEdit(ordId, "sản phẩm")}
              handleDelete={(ordId) => handleDelete(ordId, "sản phẩm")}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
