import routesConfig from "~/config/routesConfig";

/**
 * Trả về danh sách route hợp lệ theo role
 * @param {string} role - quyền hiện tại của user (vd: "admin", "manager", "staff")
 * @param {Object} options
 * @param {boolean} options.includeHidden - có lấy cả showInSidebar=false không (mặc định: false)
 */
export function getAccessibleRoutes(role, { includeHidden = false } = {}) {
  return routesConfig.filter((route) => {
    // Ẩn trong sidebar
    if (!includeHidden && route.showInSidebar === false) return false;

    // Nếu không khai báo roles -> ai cũng có quyền
    if (!route.roles) return true;

    // Nếu có roles -> chỉ hiển thị khi role khớp
    return route.roles.includes(role);
  });
}

/**
 * Lấy title (name) cho header theo path hiện tại
 */
export function getRouteTitle(pathname) {
  const found = routesConfig.find((route) => route.path === pathname);
  return found?.name || "Nội dung chính";
}
