import { useAccount } from "~/hooks/useAccount";
import AccountInfoForm from "~/components/AccountInfoForm";
import PasswordForm from "~/components/PasswordForm";
import LogoutAllButton from "~/components/LogoutAllButton";

export default function AccountManager() {
  const { userQuery, updateMutation, changePasswordMutation, logoutAllMutation } =
    useAccount();

  if (userQuery.isLoading) return <div className="p-6">Đang tải...</div>;
  if (userQuery.isError) return <div className="p-6">Lỗi tải dữ liệu</div>;

  const user = userQuery.data;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
      <AccountInfoForm user={user} updateMutation={updateMutation} />
      <PasswordForm changePasswordMutation={changePasswordMutation} />
      <LogoutAllButton logoutAllMutation={logoutAllMutation} />
    </div>
  );
}
