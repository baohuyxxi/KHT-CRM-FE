import routesConfig from "~/config/routesConfig";

/**
 * Trả về danh sách route hợp lệ theo role
 * @param {string} role - quyền hiện tại của user (vd: "admin", "manager", "staff")
 * @param {string[]} permissions - danh sách permission của user (vd: ["user:read:any", "order:write:own"])
 * @param {Object} options
 * @param {boolean} options.includeHidden - có lấy cả showInSidebar=false không (mặc định: false)
 */
export function getAccessibleRoutes(
  userPermissions = [],
  { includeHidden = false } = {}
) {
  return routesConfig.filter((route) => {
    // Ẩn trong sidebar
    if (!includeHidden && route.showInSidebar === false) return false;

    // Nếu không khai báo permissions -> ai cũng thấy
    if (!route.permissions) return true;

    // Nếu route có permissions -> user phải có ít nhất 1 quyền
    return route.permissions.some((p) => userPermissions.includes(p));
  });
}

/**
 * Lấy title (name) cho header theo path hiện tại
 */
export function getRouteTitle(pathname) {
  const found = routesConfig.find((route) => route.path === pathname);
  return found?.name || "Nội dung chính";
}
