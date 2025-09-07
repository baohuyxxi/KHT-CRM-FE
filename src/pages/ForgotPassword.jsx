import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "~/assets/images/HongThinhTechnologyServices.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      return;
    } catch (err) {
      setError(err.response?.data?.message || "Gửi thất bại, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex justify-center items-center px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[90vh]">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto h-20 sm:h-28 md:h-32"
            />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-darkText">
            Quên mật khẩu
          </h2>
          <p className="text-mutedText text-sm sm:text-base mt-1">
            Nhập email của bạn để nhận link đặt lại mật khẩu
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}
          {message && (
            <p className="text-green-500 text-sm font-medium text-center">
              {message}
            </p>
          )}

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-darkText">Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2 rounded-full text-white font-semibold hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Đang gửi..." : "Gửi link đặt lại"}
          </button>

          <div className="flex justify-between mt-3 text-sm sm:text-base">
            <Link to="/login" className="text-secondary hover:underline">
              Quay lại đăng nhập
            </Link>
            <Link to="/" className="text-primary hover:underline">
              Trang chủ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
