import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
    const [citizenIdError, setCitizenIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        owner: "",
        citizen_id: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        active: true, // thêm trạng thái hoạt động
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");

    // Chỉ cho nhập số + tối đa 13 ký tự
    const handleCitizenIdChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 13) {
            setFormData({ ...formData, citizen_id: value });
        }
    };

    const handleCitizenIdBlur = () => {
        if (formData.citizen_id.length !== 13) {
            setCitizenIdError(true);
        } else {
            setCitizenIdError(false);
        }
    };

    // Check email định dạng
    const handleEmailBlur = () => {
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(!emailRegex.test(formData.email));
        } else {
            setEmailError(false); // không nhập thì không báo lỗi
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (citizenIdError || emailError) return; // chặn submit khi có lỗi
        setLoading(true);
        setToast("");

        try {
            // Giả lập call API
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Dữ liệu khách hàng:", formData);
            setToast("Khách hàng đã được thêm thành công!");
            setTimeout(() => navigate("/customers"), 1500);
        } catch (error) {
            setToast("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    // Kiểm tra nút Lưu có disable hay không
    const isFormValid =
        formData.owner &&
        formData.citizen_id.length === 13 &&
        formData.firstName &&
        formData.lastName &&
        formData.gender &&
        formData.phone.match(/^[0-9]{10,11}$/) &&
        !citizenIdError &&
        !emailError;

    return (
        <div className="p-6 max-w-4xl mx-auto relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Thêm mới khách hàng</h1>
                <button
                    type="button"
                    onClick={() => navigate("/customers")}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                    Quay lại
                </button>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Người quản lý + CCCD */}
                <div>
                    <label className="block mb-1 font-medium">Người quản lý</label>
                    <input
                        type="text"
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Số CCCD</label>
                    <input
                        type="text"
                        name="citizen_id"
                        value={formData.citizen_id}
                        onChange={handleCitizenIdChange}
                        onBlur={handleCitizenIdBlur}
                        className={`w-full border rounded-md p-2 ${citizenIdError ? "border-red-500" : "border-gray-300"
                            }`}
                        maxLength={13}
                        required
                        placeholder="Nhập 13 số CCCD"
                    />
                    {citizenIdError && (
                        <p className="text-red-500 text-sm mt-1">CCCD phải gồm đúng 13 chữ số</p>
                    )}
                </div>

                {/* Họ + Tên */}
                <div>
                    <label className="block mb-1 font-medium">Họ</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Tên</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>

                {/* Giới tính + Ngày sinh */}
                <div>
                    <label className="block mb-1 font-medium">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        required
                    >
                        <option value="">-- Giới tính --</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Ngày sinh</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>

                {/* Địa chỉ */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>

                {/* Số điện thoại + Email */}
                <div>
                    <label className="block mb-1 font-medium">Số điện thoại</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10,11}"
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email (không bắt buộc)</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleEmailBlur}
                        className={`w-full border rounded-md p-2 ${emailError ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Nhập email nếu có"
                    />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">Email không hợp lệ</p>
                    )}
                </div>

                {/* Trạng thái hoạt động */}
                <div className="col-span-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />
                    <label className="font-medium">Đang hoạt động</label>
                </div>

                <div className="col-span-2 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("/customers")}
                        className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                        disabled={loading}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-lg flex items-center gap-2 ${isFormValid
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                        disabled={loading || !isFormValid}
                    >
                        {loading && (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        )}
                        {loading ? "Đang lưu..." : "Lưu khách hàng"}
                    </button>
                </div>
            </form>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
                    {toast}
                </div>
            )}
        </div>
    );
}
