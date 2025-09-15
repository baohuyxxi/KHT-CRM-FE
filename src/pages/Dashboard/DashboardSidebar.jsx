import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import logo from "~/assets/images/Logo.png";
import routesConfig from "~/config/routesConfig";
import * as Icons from "react-icons/md";
import { getAccessibleRoutes } from "~/utils/routes";
export default function DashboardSidebar({ isOpen, setIsOpen, role }) {
  const accessibleRoutes = getAccessibleRoutes(role);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-gray-800 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:static border-r border-gray-200 shadow-2xl`}
    >
      {/* Header */}
      <div className="h-[73px] flex justify-between items-center border-b border-gray-600 px-4">
        <div className="flex items-center gap-4">
          <div className="w-16 flex items-center justify-center rounded-full">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-14 object-cover scale-150"
              />
            </div>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-red-300 text-transparent bg-clip-text tracking-wide">
            CRM
          </span>
        </div>
        <button
          aria-label="Close sidebar"
          className="text-gray-500 hover:text-gray-800 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={26} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {accessibleRoutes.map((item) => {
          const Icon = Icons[item.icon] || null;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200
                  ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
              }
              onClick={() => setIsOpen(false)}
            >
              {Icon && <Icon size={20} className="shrink-0" />}
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 text-xs text-gray-400">
        © 2025 Admin Panel
      </div>
    </aside>
  );
}
