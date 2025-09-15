import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
// Lazy imports (giữ nguyên)

const AccountManager = lazy(() => import("./Layout/AccountManager"));
const CustomersList = lazy(() => import("./Customers/CustomersList"));
const CustomerAddNew = lazy(() => import("./Customers/CustomerAddNew"));
const BusinessList = lazy(() => import("./Business/BusinessList"));
const BusinessAddNew = lazy(() => import("./Business/BusinessAddNew"));
const OrderList = lazy(() => import("./Order/CustomerUsage"));
const AddProduct = lazy(() => import("./Order/AddProduct"));

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Gọi Header component */}
        <DashboardHeader onMenuClick={() => setIsOpen(true)} />

        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Suspense fallback={<div></div>}>
            <Routes>
              <Route path="/account" element={<AccountManager />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/customers/add" element={<CustomerAddNew />} />
              <Route path="/business" element={<BusinessList />} />
              <Route path="/business/add" element={<BusinessAddNew />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/product" element={<AddProduct />} />
              <Route index element={<BusinessList />} />
            </Routes>

            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
