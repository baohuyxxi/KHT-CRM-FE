import { useState } from "react";

export default function PasswordForm({ changePasswordMutation }) {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChangePassword = (e) => {
    e.preventDefault();
    changePasswordMutation.mutate(passwordData, {
      onSuccess: () => setPasswordData({ oldPassword: "", newPassword: "" }),
    });
  };

  return (
    <form
      onSubmit={handleChangePassword}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
      <div>
        <label className="block text-sm mb-1">Mật khẩu cũ</label>
        <input
          type="password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, oldPassword: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Mật khẩu mới</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={changePasswordMutation.isLoading}
        className="px-4 py-2 bg-secondary text-white rounded-lg"
      >
        {changePasswordMutation.isLoading ? "Đang đổi..." : "Đổi mật khẩu"}
      </button>
    </form>
  );
}
