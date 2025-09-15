const routesConfig = [
  {
    name: "Tổng quan",
    path: "/dashboard",
    icon: "MdDashboard",
    showInSidebar: true,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Khách hàng tiềm năng",
    path: "/leads",
    icon: "MdPersonSearch",
    showInSidebar: true,
  },
  {
    name: "Khách hàng",
    path: "/customers",
    icon: "MdGroup",
    showInSidebar: true,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Doanh nghiệp",
    path: "/business",
    icon: "MdBusiness",
    showInSidebar: true,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Công việc",
    path: "/tasks",
    icon: "MdAssignment",
    showInSidebar: true,

  },
  {
    name: "Báo cáo",
    path: "/reports",
    icon: "MdBarChart",
    showInSidebar: true,
 
  },
  {
    name: "Cài đặt",
    path: "/settings",
    icon: "MdSettings",
    showInSidebar: true,
 
  },
  {
    name: "Quản lý nhân viên",
    path: "/employees",
    icon: "MdGroup",
    showInSidebar: true,
    roles: ["admin"],
  },
  {
    name: "Quản lý tài khoản",
    path: "/account",
    icon: "MdAccountCircle",
    showInSidebar: false, // ❌ không hiển thị ở Sidebar
    // ❌ không cần roles => ai login cũng thấy trong AccountMenu & Header
  },
];

export default routesConfig;
