import { useState, useRef, useEffect } from "react";
import { logout } from "~/services/authAPI";
import { useNavigate, Link } from "react-router-dom";
import { getAccessibleRoutes } from "~/utils/routes";
import { LogOut, User, Settings, Shield } from "lucide-react";

export default function AccountMenu({ role = "admin" }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 🔑 Lọc các route ẩn sidebar nhưng hợp lệ với role
  const accountRoutes = getAccessibleRoutes(role, { includeHidden: true }).filter(
    (r) => r.showInDropdown === true
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 
                   text-white hover:bg-primaryDark transition-colors duration-200"
      >
        <img
          src="https://themewagon.github.io/ruang-admin/img/boy.png"
          alt="avatar"
          className="w-9 h-9 rounded-full border-2 border-white"
        />
        <span className="font-medium capitalize">{role}</span>
      </button>

      {/* Dropdown menu */}
      {openDropdown && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 
                     rounded-xl shadow-lg z-50 animate-fade-in"
        >
          <ul className="py-2 text-sm text-gray-700">
            {/* Dynamic routes */}
            {accountRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className="flex items-center gap-2 px-4 py-2 
                             hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenDropdown(false)}
                >
                  <Shield className="w-4 h-4 text-gray-500" />
                  {route.name}
                </Link>
              </li>
            ))}

            {/* Static disabled items */}
            <li className="flex items-center gap-2 px-4 py-2 text-gray-400 cursor-not-allowed">
              <User className="w-4 h-4" />
              Hồ sơ (Khóa)
            </li>
            <li className="flex items-center gap-2 px-4 py-2 text-gray-400 cursor-not-allowed">
              <Settings className="w-4 h-4" />
              Cài đặt (Khóa)
            </li>

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 
                           text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}