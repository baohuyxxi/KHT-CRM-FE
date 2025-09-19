import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import UsageTable from "~/components/Usage/UsageTable";
import { getOrders } from "~/services/orderAPI";

export default function CustomerUsage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  const fetchOrders = async () => {
    const res = await getOrders();
    if (res && res.data) {
      const prods = res.data.data.filter((o) => o.type === "SP");
      const svcs = res.data.data.filter((o) => o.type === "DV");
      setProducts(prods);
      setServices(svcs);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);



  const handleAddProduct = () => navigate("/orders/add?type=SP");

  const handleAddService = () => navigate("/orders/add?type=DV");

  const handleEdit = (id, type) => alert(`Chỉnh sửa ${type} có id: ${id}`);
  const handleDelete = (id, type) => {
    if (confirm(`Bạn có chắc muốn xóa ${type} này?`)) {
      if (type === "sản phẩm") {
        setProducts(products.filter((p) => p.ordId !== id));
      } else {
        setServices(services.filter((s) => s.ordId !== id));
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
          <div className="overflow-x-auto">
            <UsageTable
              data={products}
              handleEdit={(id) => handleEdit(id, "sản phẩm")}
              handleDelete={(id) => handleDelete(id, "sản phẩm")}
            />
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
          <div className="overflow-x-auto">
            <UsageTable
              data={services}
              handleEdit={(id) => handleEdit(id, "dịch vụ")}
              handleDelete={(id) => handleDelete(id, "dịch vụ")}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
