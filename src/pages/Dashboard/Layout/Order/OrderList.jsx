import { useEffect, useState } from "react";
import { Plus, ChevronDown, ChevronRight, Search, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import UsageTable from "~/components/Order/UsageTable";
import { getOrders, filterOrders } from "~/services/orderAPI";
import FilterPanel from "~/components/Order/Filter";

export default function CustomerUsage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const limit = 50;
  const [currentPageSP, setCurrentPageSP] = useState(1);
  const [currentPageDV, setCurrentPageDV] = useState(1);
  const [totalPagesSP, setTotalPagesSP] = useState(0);
  const [totalPagesDV, setTotalPagesDV] = useState(0);

  const defaultFilterSP = {
    type: "SP",
    reqType: "",
    search: "",
    name: "",
    startDate: "",
    endDate: "",
    paymentStatus: "",
    status: "",
    limit: limit,
    page: 1,
  };
  const defaultFilterDV = {
    type: "DV",
    reqType: "",
    search: "",
    name: "",
    startDate: "",
    endDate: "",
    paymentStatus: "",
    status: "",
    limit: limit,
    page: 1,
  };
  const [filterSP, setFilterSP] = useState(defaultFilterSP);
  const [filterDV, setFilterDV] = useState(defaultFilterDV);


  // ✅ Lấy danh sách SP
  const fetchOrdersSP = async () => {
    const resSP = await filterOrders({ ...filterSP, page: currentPageSP });
    if (resSP && resSP.data) {
      setProducts(resSP.data.data || []);
      setTotalPagesSP(resSP.data.totalPages || 0);
    }
  };

  // ✅ Lấy danh sách DV
  const fetchOrdersDV = async () => {
    const resDV = await filterOrders({ ...filterDV, page: currentPageDV });
    if (resDV && resDV.data) {
      setServices(resDV.data.data || []);
      setTotalPagesDV(resDV.data.totalPages || 0);
    }
  };

  useEffect(() => {
    fetchOrdersSP();
  }, [currentPageSP]);

  useEffect(() => {
    fetchOrdersDV();
  }, [currentPageDV]);

  const handleAddProduct = () => navigate("/orders/add?type=SP");
  const handleAddService = () => navigate("/orders/add?type=DV");

  const handleEdit = (id, type) => navigate(`/orders/edit/${id}`, { state: { id, type } });

  // ✅ Bấm Lọc
  const handleFilterSP = () => {
    setCurrentPageSP(1);
    fetchOrdersSP();
  };
  const handleFilterDV = () => {
    setCurrentPageDV(1);
    fetchOrdersDV();
  };

  // ✅ Reset filter
  const handleReset = () => {
    setFilterSP(defaultFilterSP);
    setFilterDV(defaultFilterDV);
    setCurrentPageSP(1);
    setCurrentPageDV(1);
    fetchOrdersSP();
    fetchOrdersDV();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Sản phẩm & Dịch vụ Khách hàng sử dụng</h1>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus className="w-4 h-4" /> Thêm sản phẩm
        </button>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          <TabsTrigger value="services">Dịch vụ</TabsTrigger>
        </TabsList>

        {/* Tab sản phẩm */}
        <TabsContent value="products">
          <div className="mb-4 p-4 bg-white border rounded-lg shadow-sm">
            <FilterPanel
              filter={filterSP}
              setFilter={setFilterSP}
              onFilter={handleFilterSP}
              onReset={handleReset}
            />
          </div>

          {products.length === 0 ? (
            <div className="p-4 text-center text-gray-500 italic border rounded-lg bg-white">
              Không có đơn hàng nào
            </div>
          ) : (
            <div className="overflow-x-auto w-full max-w-[1200px] mx-auto">
              <div className="w-[1500px]">
                <UsageTable
                  data={products}
                  handleEdit={(id) => handleEdit(id, "sản phẩm")}
                  currentPage={currentPageSP}
                  totalPages={totalPagesSP}
                  onPageChange={(page) => {
                    setCurrentPageSP(page)
                    setFilterSP({ ...filterSP, page: page })
                  }}
                />
              </div>
            </div>
          )}
        </TabsContent>

        {/* Tab dịch vụ */}
        <TabsContent value="services">
          <div className="mb-4 p-4 bg-white border rounded-lg shadow-sm">
            <FilterPanel
              filter={filterDV}
              setFilter={setFilterDV}
              onFilter={handleFilterDV}
              onReset={handleReset}
            />
          </div>

          {services.length === 0 ? (
            <div className="p-4 text-center text-gray-500 italic border rounded-lg bg-white">
              Không có đơn hàng nào
            </div>
          ) : (
            <div className="overflow-x-auto w-full max-w-[1200px] mx-auto">
              <div className="w-[1500px]">
                <UsageTable
                  data={services}
                  handleEdit={(id) => handleEdit(id, "dịch vụ")}
                  currentPage={currentPageDV}
                  totalPages={totalPagesDV}
                  onPageChange={(page) => setCurrentPageDV(page)}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
