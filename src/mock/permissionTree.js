// permissionTree.js
export const permissionTree = [
  {
    value: "auth",
    label: "Xác thực",
    children: [{ value: "auth:login", label: "Đăng nhập" }],
  },
  {
    value: "employee",
    label: "Quản Lý Nhân Sự",
    children: [
      { value: "employee:read:any", label: "Xem tất cả nhân viên" },
      { value: "employee:read:own", label: "Xem nhân viên của mình" },
      { value: "employee:create:any", label: "Tạo nhân viên" },
      { value: "employee:update:any", label: "Cập nhật tất cả nhân viên" },
      { value: "employee:update:own", label: "Cập nhật nhân viên của mình" },
      { value: "employee:role", label: "Quản lý vai trò" },
    ],
  },
  {
    value: "customer",
    label: "Khách hàng",
    children: [
      { value: "customer:read:any", label: "Xem tất cả khách hàng" },
      { value: "customer:read:own", label: "Xem khách hàng của mình" },
      { value: "customer:create", label: "Tạo khách hàng" },
      { value: "customer:update:any", label: "Cập nhật tất cả khách hàng" },
      { value: "customer:update:own", label: "Cập nhật khách hàng của mình" },
      { value: "customer:delete:any", label: "Xóa tất cả khách hàng" },
      { value: "customer:delete:own", label: "Xóa khách hàng của mình" },
    ],
  },
  {
    value: "business",
    label: "Doanh nghiệp",
    children: [
      { value: "business:read:any", label: "Xem tất cả doanh nghiệp" },
      { value: "business:delete:any", label: "Xóa tất cả doanh nghiệp" },
      { value: "business:update:any", label: "Cập nhật tất cả doanh nghiệp" },
      { value: "business:read:own", label: "Xem doanh nghiệp của mình" },
      { value: "business:create", label: "Tạo doanh nghiệp" },
      { value: "business:update:own", label: "Cập nhật doanh nghiệp của mình" },
      { value: "business:delete:own", label: "Xóa doanh nghiệp của mình" },
    ],
  },
  {
    value: "order",
    label: "Đơn hàng",
    children: [
      { value: "order:read:any", label: "Xem tất cả đơn hàng" },
      { value: "order:update:any", label: "Cập nhật tất cả đơn hàng" },
      { value: "order:delete:any", label: "Xóa tất cả đơn hàng" },
      { value: "order:read:own", label: "Xem đơn hàng của mình" },
      { value: "order:create", label: "Tạo đơn hàng" },
      { value: "order:update:own", label: "Cập nhật đơn hàng của mình" },
      { value: "order:delete:own", label: "Xóa đơn hàng của mình" },
    ],
  },
  {
    value: "task",
    label: "Công việc",
    children: [
      { value: "task:read:any", label: "Xem tất cả công việc" },
      { value: "task:read:own", label: "Xem công việc của mình" },
      { value: "task:create", label: "Tạo công việc" },
      { value: "task:update:any", label: "Cập nhật tất cả công việc" },
      { value: "task:update:own", label: "Cập nhật công việc của mình" },
      { value: "task:delete:any", label: "Xóa tất cả công việc" },
      { value: "task:delete:own", label: "Xóa công việc của mình" },
    ],
  },
];
