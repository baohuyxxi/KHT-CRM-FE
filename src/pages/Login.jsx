import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "~/services/authAPI";
import { setCredentials } from "~/redux/slices/authSlice";
import logo from "~/assets/images/HongThinhTechnologyServices.png";
import { globalLoading } from "~/context/LoadingContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  globalLoading(true, "Đang đăng nhập...");

  try {
    const data = await login(email, password); 
    // data = { accessToken, refreshToken, user }

    // Lưu Redux
    dispatch(setCredentials(data));

    // Lưu localStorage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Đăng nhập thất bại");
  } finally {
    globalLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Logo + Tiêu đề */}
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-16 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">CRM</h1>
          <p className="text-gray-500 mt-1">Đăng nhập để tiếp tục</p>
        </div>

        {/* Hiển thị lỗi */}
        {error && (
          <div className="p-2 mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
