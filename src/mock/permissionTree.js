// permissionTree.js
export const permissionTree = [
  {
    value: "employee",
    label: "Nhân viên",
    children: [
      { value: "employee:read:any", label: "Xem tất cả nhân viên" },
      { value: "employee:read:own", label: "Xem nhân viên của mình" },
      { value: "employee:create:any", label: "Tạo nhân viên" },
      { value: "employee:update:any", label: "Cập nhật tất cả nhân viên" },
      { value: "employee:update:own", label: "Cập nhật nhân viên của mình" },
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
