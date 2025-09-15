import { useLocation } from "react-router-dom";
import AccountMenu from "~/components/AccountMenu";
import { getRouteTitle } from "~/utils/routes";
import { Menu } from "lucide-react";

export default function DashboardHeader({ onMenuClick }) {
  const { pathname } = useLocation();
  const title = getRouteTitle(pathname);

  return (
    <header className="sticky top-0 z-50 h-[73px] bg-gradient-to-r from-primary to-primaryDark px-4 md:px-8 border-b border-gray-700 flex justify-between items-center">
      {/* LEFT: mobile menu button + title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-primaryDark text-white"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Title */}
        <h1 className="text-lg md:text-xl font-semibold text-white">
          {title || "Trang không xác định"}
        </h1>
      </div>

      {/* RIGHT: account menu */}
      <AccountMenu />
    </header>
  );
}
