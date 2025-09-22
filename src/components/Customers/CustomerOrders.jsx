import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import UsageTable from "~/components/Usage/UsageTable";
import { getOrdersByCustomerId } from "~/services/orderAPI";


export default function CustomerUsage() {
  const navigate = useNavigate();
  const { id } = useParams(); // đổi từ cusId -> id
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);


  const fetchOrders = async () => {
    const res = await getOrdersByCustomerId(id); // truyền id vào API
    if (res && res.data) {
      const prods = res.data.data.filter((o) => o.type === "SP");
      const svcs = res.data.data.filter((o) => o.type === "DV");
      setProducts(prods);
      setServices(svcs);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [id]);

  const handleAddProduct = () => navigate(`/orders/add?type=SP&cusId=${id}`);
  const handleAddService = () => navigate(`/orders/add?type=DV&cusId=${id}`);

  const handleEdit = (ordId, type) =>
    navigate(`/orders/edit/${ordId}`, { state: { ordId, type } });

  const handleDelete = (ordId, type) => {
    if (confirm(`Bạn có chắc muốn xóa ${type} này?`)) {
      if (type === "sản phẩm") {
        setProducts(products.filter((p) => p.ordId !== ordId));
      } else {
        setServices(services.filter((s) => s.ordId !== ordId));
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Sản phẩm & Dịch vụ Khách hàng sử dụng
      </h1>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          <TabsTrigger value="services">Dịch vụ</TabsTrigger>
        </TabsList>

        {/* Tab sản phẩm */}
        <TabsContent value="products">
          <div className="flex justify-between mb-3">
            <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Plus className="w-4 h-4" /> Thêm sản phẩm
            </button>
          </div>
          <div className="overflow-x-auto w-full max-w-[1050px] mx-auto">
            <div className="w-[1500px]">
              <UsageTable
                data={products}
                handleEdit={(ordId) => handleEdit(ordId, "sản phẩm")}
                handleDelete={(ordId) => handleDelete(ordId, "sản phẩm")}
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab dịch vụ */}
        <TabsContent value="services">
          <div className="flex justify-between mb-3">
            <h2 className="text-lg font-semibold">Danh sách dịch vụ</h2>
            <button
              onClick={handleAddService}
              className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" /> Thêm dịch vụ
            </button>
          </div>
          <div className="overflow-x-auto w-full max-w-[1000px] mx-auto">
            <div className="w-[1500px]">
              <UsageTable
                data={services}
                handleEdit={(ordId) => handleEdit(ordId, "dịch vụ")}
                handleDelete={(ordId) => handleDelete(ordId, "dịch vụ")}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
