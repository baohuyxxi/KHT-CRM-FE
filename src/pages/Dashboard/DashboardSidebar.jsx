import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "~/assets/images/Logo.png";
import * as Icons from "react-icons/md";
import { getAccessibleRoutes } from "~/utils/routes";

export default function DashboardSidebar({ isOpen, setIsOpen, role }) {
  const accessibleRoutes = getAccessibleRoutes(role);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 
        ${collapsed ? "w-20" : "w-64"} 
        bg-white text-gray-800 transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static border-r border-gray-200 shadow-2xl flex flex-col`}
    >
      {/* Header */}
      <div className="h-[73px] flex justify-between items-center border-b border-gray-200 px-3">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="object-contain transition-all duration-300 h-12 w-12"
          />
          {!collapsed && (
            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-red-300 text-transparent bg-clip-text tracking-wide whitespace-nowrap">
              CRM
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
          >
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>

          {/* Mobile close */}
          <button
            aria-label="Close sidebar"
            className="text-gray-500 hover:text-gray-800 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
        {accessibleRoutes.map((item) => {
          const Icon = Icons[item.icon] || null;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200
                  ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
              }
              onClick={() => setIsOpen(false)}
            >
              {Icon && <Icon size={22} className="shrink-0" />}
              <span
                className={`truncate transition-all duration-200 ${
                  collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          © 2025 Admin Panel
        </div>
      )}
    </aside>
  );
}
