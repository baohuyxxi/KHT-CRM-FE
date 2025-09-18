import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { register } from "~/services/authAPI";
import { globalLoading } from "~/context/LoadingContext";

export default function CreateEmployeeModal({ onClose, refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tenantId: "",
  });

  useEffect(() => {
    const tenantId = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).tenantId
      : "";
    setForm((f) => ({ ...f, tenantId }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    globalLoading(true, "Đang tạo nhân viên...");
    try {
      await register(form);
      toast.success("Tạo nhân viên thành công!");
      setForm({ name: "", email: "", password: "" });
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      globalLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Tạo tài khoản nhân viên</h3>

        <div className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên nhân viên"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email nhân viên"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Mật khẩu"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-primaryDark"
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
}
