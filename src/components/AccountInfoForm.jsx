import { useState, useEffect } from "react";

export default function AccountInfoForm({ user, updateMutation }) {
  const [editData, setEditData] = useState({ name: "" });

  useEffect(() => {
    if (user) setEditData({ name: user.name });
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate(editData);
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>

      <div>
        <label className="block text-sm mb-1">Họ tên</label>
        <input
          type="text"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Vai trò</label>
        <p className="px-3 py-2 border rounded-lg bg-gray-50">{user.role}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Trạng thái</label>
          <p
            className={`px-3 py-2 border rounded-lg ${
              user.isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.isActive ? "Hoạt động" : "Ngừng hoạt động"}
          </p>
        </div>
        <div>
          <label className="block text-sm mb-1">Ngày tạo</label>
          <p className="px-3 py-2 border rounded-lg bg-gray-50">
            {new Date(user.createdAt).toLocaleString("vi-VN")}
          </p>
        </div>
        <div>
          <label className="block text-sm mb-1">Cập nhật lần cuối</label>
          <p className="px-3 py-2 border rounded-lg bg-gray-50">
            {new Date(user.updatedAt).toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={updateMutation.isLoading}
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        {updateMutation.isLoading ? "Đang lưu..." : "Cập nhật"}
      </button>
    </form>
  );
}
