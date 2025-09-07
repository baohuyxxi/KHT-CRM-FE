import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser, changePassword } from "~/services/userAPI";
import { logoutAll } from "~/services/authAPI";
// Hook quản lý tài khoản
export function useAccount() {
  const queryClient = useQueryClient();

  // Lấy thông tin user
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    select: (res) => res.data.data, // lấy luôn data từ response
  });

  // Cập nhật thông tin user
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]); // reload lại user sau khi update
    },
  });

  // Đổi mật khẩu
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
  });

  // Đăng xuất khỏi tất cả thiết bị
  const logoutAllMutation = useMutation({
    mutationFn: logoutAll,
  });   

  return {
    userQuery,
    updateMutation,
    changePasswordMutation,
    logoutAllMutation,
  };
}
