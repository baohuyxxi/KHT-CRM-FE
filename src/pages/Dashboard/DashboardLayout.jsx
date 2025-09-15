import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { getAccessibleRoutes } from "~/utils/routes";
import { useSelector } from "react-redux";

// Lazy imports (ví dụ, có thể import động theo path)
const AccountManager = lazy(() => import("./Layout/AccountManager"));
//Quản lý nhân viên
const EmployeeManager = lazy(() => import("./Layout/EmployeeManager"));

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  // 🔑 Giả sử lấy role từ localStorage (bạn thay bằng context hoặc redux)
  const user = useSelector((state) => state.auth.user);

  const role = user?.role || "staff";

  // Lấy routes theo role (bao gồm cả showInSidebar=false như /account)
  const accessibleRoutes = getAccessibleRoutes(role, { includeHidden: true });

  // Map path -> component (tạm hardcode, bạn có thể import động)
  const componentMap = {
    "/account": AccountManager,
    "/employees": EmployeeManager,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} role={role} />
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
