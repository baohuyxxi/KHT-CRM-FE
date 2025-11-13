import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import UsageTable from "~/components/Order/UsageTable";
import { getOrdersByCustomerId } from "~/services/orderAPI";
import InvoiceDialog from "../exportPDF";
import SelectOrdersDialog from "../SelectOrdersDialog";
import InvoiceListDialog from "../InvoiceDialog";
import { getCustomerById } from "~/services/customerAPI";


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
  const [openInvoiceList, setOpenInvoiceList] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const handleViewInvoice = async () => {
   
    const res = await getCustomerById(cus[0].cusId);
    if (res && res.data) {
      setInvoices(res.data.data.invoices || []);
    }

    setOpenInvoiceList(true);
  };

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
      setProds(res.data.data
        .filter(order => !order.issued)
        .map(order => ({
          ordId: order.ordId,
          name: order.name,
          qty: 1,
          price: order.price,
          note: ""
        })));
      const foundIndex = cus.findIndex(b => b.busId === res.data.data[0].busId);
      if (foundIndex !== -1) {
        setCustomer({
          cusId: cus[foundIndex].cusId,
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
        <h1 className="text-2xl font-bold">
          Sản phẩm & Dịch vụ Khách hàng sử dụng
        </h1>

        <div className="flex items-center gap-3">
          {/* Nhóm nút hóa đơn */}
          <div className="flex gap-2">
            <button
              onClick={() => setOpenSelect(true)}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md transition 
                   bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Xuất hóa đơn
            </button>

            <button
              onClick={() => handleViewInvoice()}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md transition 
                   bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
            >
              Xem DS hóa đơn
            </button>
          </div>

          {/* Nút thêm sản phẩm */}
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md transition 
                 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-4 h-4" /> Thêm sản phẩm
          </button>
        </div>

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
          setOrders={setProds}
          reloadOrders={fetchOrders}
          template={3}
        />
      </div>

      <div className="mb-4">
        <div className="overflow-x-auto w-full max-w-[1200px] mx-auto">
          <div className="w-[1500px]">
            <UsageTable
              data={products}
              handleEdit={(ordId) => handleEdit(ordId, "sản phẩm")}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <InvoiceListDialog
        open={openInvoiceList}
        onClose={() => setOpenInvoiceList(false)}
        invoices={invoices}
        cusId={customer.cusId}
      />

    </div>
  );
}
