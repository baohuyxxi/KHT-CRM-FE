import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import UsageTable from "~/components/Usage/UsageTable";

export default function CustomerUsage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([
        {
            id: 1,
            customerCCCD: "CCCD1001",
            customerName: "Nguyễn Văn A",
            companyTax: "0101234567",
            name: "Phần mềm kế toán",
            registerDate: "2024-09-01",
            startDate: "2024-09-10",
            expireDate: "2025-09-10",
            expectedEnd: "2025-09-15",
            price: "5,000,000",
            paymentStatus: "Đã thanh toán",
            status: "Hoàn thành",
        },
    ]);

    const [services, setServices] = useState([
        {
            id: 1,
            customerCCCD: "CCCD1002",
            customerName: "Trần Thị B",
            companyTax: "0207654321",
            name: "Dịch vụ thành lập doanh nghiệp",
            registerDate: "2024-09-05",
            startDate: "2024-09-06",
            expireDate: "2025-09-06",
            expectedEnd: "2025-09-07",
            price: "3,000,000",
            paymentStatus: "Chưa thanh toán",
            status: "Đang xử lý",
        },
    ]);

    const handleAddProduct = () => navigate("/orders/product");
    const handleAddService = () => navigate("/usage/add-service");

    const handleEdit = (id, type) => alert(`Chỉnh sửa ${type} có id: ${id}`);
    const handleDelete = (id, type) => {
        if (confirm(`Bạn có chắc muốn xóa ${type} này?`)) {
            if (type === "sản phẩm") {
                setProducts(products.filter((p) => p.id !== id));
            } else {
                setServices(services.filter((s) => s.id !== id));
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Sản phẩm & Dịch vụ Khách hàng sử dụng</h1>

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
                    <UsageTable
                        data={products}
                        handleEdit={(id) => handleEdit(id, "sản phẩm")}
                        handleDelete={(id) => handleDelete(id, "sản phẩm")}
                    />
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
                    <UsageTable
                        data={services}
                        handleEdit={(id) => handleEdit(id, "dịch vụ")}
                        handleDelete={(id) => handleDelete(id, "dịch vụ")}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
