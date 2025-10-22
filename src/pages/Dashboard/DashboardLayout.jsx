import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { getAccessibleRoutes } from "~/utils/routes";
import { useSelector } from "react-redux";

// Lazy imports (ví dụ, có thể import động theo path)
const AccountManager = lazy(() => import("./Layout/AccountManager"));
const CustomersList = lazy(() => import("./Layout/Customers/CustomersList"));
const CustomersListLead = lazy(() => import("./Layout/Customers/CustomersLeadList"));
const CustomersListPro = lazy(() => import("./Layout/Customers/CustomersProList"));
const CustomerAddNew = lazy(() => import("./Layout/Customers/CustomerAddNew"));
const BusinessList = lazy(() => import("./Layout/Business/BusinessList"));
const BusinessAddNew = lazy(() => import("./Layout/Business/BusinessAddNew"));
const OrderList = lazy(() => import("./Layout/Order/OrderList"));
const AddProduct = lazy(() => import("./Layout/Order/AddProduct"));
const Task = lazy(() => import("./Layout/Task/Task"));
//Quản lý nhân viên
const EmployeeManager = lazy(() => import("./Layout/EmployeeManager/EmployeeManager"));
const CreateTask = lazy(() => import("./Layout/Task/CreateTask"));
const TaskLogPage = lazy(() => import("./Layout/Task/TaskLog/TaskLogPage"));

const CustomerOrders = lazy(() => import("~/components/Customers/CustomerOrders"));

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  // 🔑 Giả sử lấy role từ localStorage (bạn thay bằng context hoặc redux)
  const user = useSelector((state) => state.auth.user);

  const role = user?.role || "staff";

  // Lấy routes theo role (bao gồm cả showInSidebar=false như /account)
  const accessibleRoutes = getAccessibleRoutes(user.permissions);

  // Map path -> component (tạm hardcode, bạn có thể import động)
  const componentMap = {
    "/account": AccountManager,
    "/employees": EmployeeManager,
    "/leads": CustomersListLead,
    "/prospects": CustomersListPro,
    "/customers": CustomersList,
    "/customers/add": CustomerAddNew,
    "/customers/edit/:id": CustomerAddNew,
    "/business": BusinessList,
    "/business/add": BusinessAddNew,
    "/business/edit/:id": BusinessAddNew,
    "/orders": OrderList,
    "/customers/:id/orders": CustomerOrders,
    "/orders/add": AddProduct,
    "/orders/edit/:id": AddProduct,
    "/tasks": Task,
    "/tasks/create": CreateTask,
    "/tasks/:taskLogId/:logs": TaskLogPage,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setIsOpen(true)} />

        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {accessibleRoutes.map((route) => {
                const Component = componentMap[route.path];
                if (!Component) return null;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Routes>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
