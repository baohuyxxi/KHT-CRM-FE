const routesConfig = [
  {
    name: "Tổng quan",
    path: "/dashboard",
    icon: "MdDashboard",
    showInSidebar: true,
    showInDropdown: false,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Khách hàng tiềm năng",
    path: "/leads",
    icon: "MdPersonSearch",
    showInSidebar: true,
    showInDropdown: false,
  },
  {
    name: "Khách hàng",
    path: "/customers",
    icon: "MdGroup",
    showInSidebar: true,
    showInDropdown: false,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Khách hàng",
    path: "/customers/add",
    icon: "MdGroup",
    showInSidebar: false,
    showInDropdown: false,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Khách hàng",
    path: "/customers/edit/:id",
    icon: "MdGroup",
    showInSidebar: false,
    showInDropdown: false,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Doanh nghiệp",
    path: "/business",
    icon: "MdBusiness",
    showInSidebar: true,
    showInDropdown: false,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Thêm Doanh nghiệp ",
    path: "/business/add",
    icon: "MdBusiness",
    showInSidebar: false,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Doanh nghiệp",
    path: "/business/edit/:id",
    icon: "MdBusiness",
    showInSidebar: false,
    // ❌ không cần roles => tất cả roles đều thấy
  },
  {
    name: "Đơn hàng",
    path: "/orders",
    icon: "MdAssignment",
    showInSidebar: true,
    showInDropdown: false,
  },
  {
    name: "Đơn hàng",
    path: "/orders/add",
    icon: "MdAssignment",
    showInSidebar: false,

  },
  {
    name: "Công việc",
    path: "/tasks",
    icon: "MdAssignment",
    showInSidebar: true,
    showInDropdown: false,
  },
  {
    name: "Tạo công việc",
    path: "/tasks/create",
    icon: "MdAssignment",
    showInSidebar: false,
    showInDropdown: false,
  },
  {
    name: "Thực hiện công việc",
    path: "/tasks/:taskLogId/:logs",
    showInSidebar: false,
    showInDropdown: false,
  },
  {
    name: "Báo cáo",
    path: "/reports",
    icon: "MdBarChart",
    showInSidebar: true,
    showInDropdown: false,
  },
  {
    name: "Cài đặt",
    path: "/settings",
    icon: "MdSettings",
    showInSidebar: true,
    showInDropdown: false,
  },
  {
    name: "Quản lý nhân viên",
    path: "/employees",
    icon: "MdGroup",
    showInSidebar: true,
    showInDropdown: false,
    permissions: ["employee:read:any"],
  },
  {
    name: "Quản lý tài khoản",
    path: "/account",
    icon: "MdAccountCircle",
    showInSidebar: false, // ❌ không hiển thị ở Sidebar
    showInDropdown: true, // ✅ hiển thị ở Dropdown (AccountMenu)
    // ❌ không cần roles => ai login cũng thấy trong AccountMenu & Header
  },
];

export default routesConfig;
