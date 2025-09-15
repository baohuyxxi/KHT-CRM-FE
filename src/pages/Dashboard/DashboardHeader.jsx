import { useLocation } from "react-router-dom";
import AccountMenu from "~/components/AccountMenu";
import { getRouteTitle } from "~/utils/routes";

export default function DashboardHeader() {
  const { pathname } = useLocation();
  const title = getRouteTitle(pathname);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primaryDark p-4 pr-12 font-bold border-b border-gray-700 hidden md:flex justify-between items-center">
      <h1 className="text-xl font-semibold text-white">
        {title || "Trang không xác định"}
      </h1>
      <AccountMenu />
    </header>
  );
}
