import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import functionAdmin from "~/models/funcionAdmin";

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-gray-800 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:static border-r border-gray-200 shadow-md`}
    >
      {/* Header */}
      <div className="p-6 text-xl font-bold border-b border-gray-200 flex justify-between items-center">
        <span className="tracking-wide ">Bảng quản trị</span>
        <button
          className="text-gray-500 hover:text-gray-800 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {functionAdmin.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-colors duration-200
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-sm text-gray-400">
        © 2025 Admin Panel
      </div>
    </aside>
  );
}
