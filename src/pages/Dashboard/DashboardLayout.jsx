import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { getAccessibleRoutes } from "~/utils/routes";
import { useSelector } from "react-redux";

// Lazy imports (ví dụ, có thể import động theo path)
const AccountManager = lazy(() => import("./Layout/AccountManager"));
const CustomersList = lazy(() => import("./Layout/Customers/CustomersList"));
const CustomerAddNew = lazy(() => import("./Layout/Customers/CustomerAddNew"));
const BusinessList = lazy(() => import("./Layout/Business/BusinessList"));
const BusinessAddNew = lazy(() => import("./Layout/Business/BusinessAddNew"));
const OrderList = lazy(() => import("./Layout/Order/OrderList"));
const AddProduct = lazy(() => import("./Layout/Order/AddProduct"));

//Quản lý nhân viên
const EmployeeManager = lazy(() => import("./Layout/EmployeeManager/EmployeeManager"));

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
    "/customers": CustomersList,
    "/customers/add": CustomerAddNew,
    "/customers/edit/:id": CustomerAddNew,
    "/business": BusinessList,
    "/business/add": BusinessAddNew,
    "/business/edit/:id": BusinessAddNew,
    "/orders": OrderList,
    "/orders/add": AddProduct,
    "/orders/edit/:id": AddProduct,
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

              {/* <Route path="/account" element={<AccountManager />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/customers/add" element={<CustomerAddNew />} />
              <Route path="/business" element={<BusinessList />} />
              <Route path="/business/add" element={<BusinessAddNew />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/product" element={<AddProduct />} />
              <Route index element={<BusinessList />} /> */}

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
