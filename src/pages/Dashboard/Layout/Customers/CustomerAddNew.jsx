import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { createCustomer, getCustomerById, updateCustomer } from "~/services/customerAPI";

export default function AddCustomer() {
    const [citizenIdError, setCitizenIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameUser, setNameUser] = useState("");
    const navigate = useNavigate();
    const [mode, setMode] = useState("add"); // 'add' hoặc 'edit'
    const { id } = useParams();
    const location = useLocation();

    const [formData, setFormData] = useState({
        owner: "",
        citizenId: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        customerType: "",
        active: true
    });

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");

    const fetchCustomerById = async (id) => {
        try {
            setLoading(true);
            const response = await getCustomerById(id);
            if (response.data && response.data.success) {
                const customer = response.data.data;
                setFormData({
                    owner: customer.owner || "",
                    citizenId: customer.citizenId || "",
                    firstName: customer.firstName || "",
                    lastName: customer.lastName || "",
                    dob: customer.dob ? customer.dob.split("T")[0] : "",
                    gender: customer.gender || "",
                    address: customer.address || "",
                    phone: customer.phone || "",
                    email: customer.email || "",
                    customerType: customer.customerType || "",
                    active: customer.active || true
                });
            }
        } catch (error) {
            console.error("Error fetching customer:", error);
        } finally {
            setLoading(false);
        }
    };


    // 🔹 Tạo mã KH tự động khi mở form
    useEffect(() => {
        if (id && location.state && location.state.id) {
            setMode("edit");
            fetchCustomerById(location?.state.id);
        } else {
            const user = JSON.parse(localStorage.getItem("user"));
            setFormData((prev) => ({ ...prev, owner: user.userId }));
            setNameUser(user.name);
        }
    }, []);

    // CCCD chỉ nhập số + tối đa 13
    const handleCitizenIdChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 13) {
            setFormData({ ...formData, citizenId: value });
        }
    };

    const handleCitizenIdBlur = () => {
        if (formData.citizenId && formData.citizenId.length > 8 && formData.citizenId.length < 13) {
            setCitizenIdError(false);
        } else {
            setCitizenIdError(true);
        }
    };

    // Check email
    const handleEmailBlur = () => {
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(!emailRegex.test(formData.email));
        } else {
            setEmailError(false);
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
        e.preventDefault(); // tránh reload form mặc định
        setLoading(true);
        setToast("");
        try {
            if (mode === "add") {
                const res = await createCustomer(formData);
                if (res && res.data && res.data.success) {
                    setToast("Khách hàng đã được thêm thành công!");
                    setFormData({
                        owner: formData.owner,
                        citizenId: "",
                        firstName: "",
                        lastName: "",
                        dob: "",
                        gender: "",
                        address: "",
                        phone: "",
                        email: "",
                        customerType: "",
                        active: true
                    });
                } else {
                    setToast("Thêm khách hàng thất bại, vui lòng thử lại!");
                }
            } else {
                const res = await updateCustomer(id, formData);
                if (res && res.data && res.data.success) {
                    setToast("Khách hàng đã được cập nhật thành công!");
                    setTimeout(() => navigate(-1), 500);
                } else {
                    setToast("Cập nhật khách hàng thất bại, vui lòng thử lại!");
                }
            }
        } catch (error) {
            setToast("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    // Chỉ bắt buộc các trường chính
    const isFormValid =
        formData.owner &&
        formData.customerType &&
        formData.gender &&
        formData.phone.match(/^[0-9]{10,11}$/) &&
        !citizenIdError &&
        !emailError;

    return (
        <div className="p-6 max-w-4xl mx-auto relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{mode === "add" ? "Thêm khách hàng mới" : "Chỉnh sửa khách hàng"}</h1>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                    Quay lại
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Người quản 
                 */}
                <div>
                    <label className="block mb-1 font-medium">Mã người quản lý</label>
                    <input
                        type="text"
                        name="owner"
                        value={formData.owner}
                        readOnly
                        className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
                        required
                    />
                </div>
                {/* Người quản lý */}
                <div>
                    <label className="block mb-1 font-medium">Tên người quản lý</label>
                    <input
                        type="text"
                        name="owner"
                        value={nameUser}
                        readOnly
                        className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
                    />
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
                    />
                </div>

                {/* CCCD (ko bắt buộc) */}
                <div>
                    <label className="block mb-1 font-medium">Số CCCD (tùy chọn)</label>
                    <input
                        type="text"
                        name="citizen_id"
                        value={formData.citizenId}
                        onChange={handleCitizenIdChange}
                        onBlur={handleCitizenIdBlur}
                        className={`w-full border rounded-md p-2 ${citizenIdError ? "border-red-500" : "border-gray-300"
                            }`}
                        maxLength={13}
                        placeholder="Nhập 13 số CCCD"
                    />
                    {citizenIdError && (
                        <p className="text-red-500 text-sm mt-1">
                            CCCD phải gồm đúng 13 chữ số
                        </p>
                    )}
                </div>

                {/* Phân loại khách hàng */}
                <div>
                    <label className="block mb-1 font-medium">Loại khách hàng</label>
                    <select
                        name="customerType"
                        value={formData.customerType}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="">-- Chọn loại --</option>
                        <option value="Thị trường">Thị trường</option>
                        <option value="Tiềm năng">Tiềm năng</option>
                        <option value="Đã là khách hàng">Đã là khách hàng</option>
                    </select>
                </div>

                {/* Giới tính + Ngày sinh (tùy chọn) */}
                <div>
                    <label className="block mb-1 font-medium">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
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

                {/* Địa chỉ (tùy chọn) */}
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

                {/* Số điện thoại (bắt buộc) + Email (tùy chọn) */}
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
                    <label className="block mb-1 font-medium">Email (tùy chọn)</label>
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

                {/* Trạng thái */}
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

                {/* Buttons */}
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
                        {loading ? "Đang lưu..." : (mode === "add" ? "Thêm khách hàng" : "Lưu thay đổi")}
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
