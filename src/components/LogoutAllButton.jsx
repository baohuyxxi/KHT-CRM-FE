export default function LogoutAllButton({ logoutAllMutation }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold">Quản lý phiên đăng nhập</h2>
      <button
        onClick={() => logoutAllMutation.mutate()}
        disabled={logoutAllMutation.isLoading}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        {logoutAllMutation.isLoading
          ? "Đang đăng xuất tất cả..."
          : "Đăng xuất khỏi tất cả thiết bị"}
      </button>
    </div>
  );
}
