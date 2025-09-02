import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
// Lazy imports (giữ nguyên)

const AccountManager = lazy(() => import("./Layout/AccountManager"));

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
            </Routes>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
