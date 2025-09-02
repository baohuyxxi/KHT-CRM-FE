import { useState } from "react";
import { changePassword } from "~/services/authAPI";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(oldPassword, newPassword);
      alert(res.message || "Đổi mật khẩu thành công");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi đổi mật khẩu");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded w-full"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}
