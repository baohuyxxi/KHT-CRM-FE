import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "~/assets/images/HongThinhTechnologyServices.png";

export default function ResetPassword() {
  const [step, setStep] = useState(1); // bước 1: nhập code, bước 2: đổi mật khẩu
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // giả lập gọi API bước 1 (xác thực code)
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      // await verifyCodeAPI(email, code)
      if (!code) throw new Error("Nhập mã code hợp lệ");
      setMessage("Mã hợp lệ! Nhập mật khẩu mới.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Mã code không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  // giả lập đổi mật khẩu
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      if (newPassword !== confirmPassword)
        throw new Error("Mật khẩu mới không khớp");
      if (!newPassword) throw new Error("Nhập mật khẩu mới");

      // await resetPasswordAPI({ email, code, newPassword })
      setMessage("Đổi mật khẩu thành công!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 overflow-y-auto max-h-screen">
        <div className="text-center mb-6">
          <Link to="/">
            <img src={logo} alt="Logo" className="mx-auto h-20 sm:h-32 md:h-40" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-darkText">
            {step === 1 ? "Nhập mã code" : "Đổi mật khẩu mới"}
          </h2>
          <p className="text-mutedText text-sm sm:text-base mt-1">
            {step === 1
              ? "Nhập mã code bạn nhận được qua email"
              : "Nhập mật khẩu mới của bạn"}
          </p>
        </div>

        {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm font-medium text-center">{message}</p>}

        {step === 1 ? (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-darkText">Email</label>
              <input
                type="email"
                placeholder="Nhập email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-darkText">Mã code</label>
              <input
                type="text"
                placeholder="Nhập mã code"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2 rounded-full text-white font-semibold hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Đang xác thực..." : "Xác thực mã"}
            </button>
            <div className="text-center mt-2">
              <Link to="/admin/forgot-password" className="text-secondary hover:underline text-sm sm:text-base">
                Quay lại quên mật khẩu
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="flex flex-col relative">
              <label className="mb-1 font-medium text-darkText">Mật khẩu mới</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-primary"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-darkText">Xác nhận mật khẩu</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2 rounded-full text-white font-semibold hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Đang lưu..." : "Đổi mật khẩu"}
            </button>
            <div className="text-center mt-2">
              <Link to="/login" className="text-secondary hover:underline text-sm sm:text-base">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
