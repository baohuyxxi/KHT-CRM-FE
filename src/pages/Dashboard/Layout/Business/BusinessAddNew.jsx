// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Save } from "lucide-react";

// export default function AddBusiness() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     owner: null,
//     ownerName: null,
//     name: null,
//     type: null,
//     taxId: null,
//     licenseCode: null,
//     licenseFile: null,
//     startDate: null,
//     address: null,
//     phone: null,
//     email: null,
//     representativeId: null,
//     representativeName: null,
//     active: true,
//     cusId: null
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let newErrors = {};
//     if (!/^[0-9]{10}$/.test(formData.taxId)) {
//       newErrors.taxId = "MST phải gồm 10 chữ số";
//     }
//     if (!/^[0-9]{9,12}$/.test(formData.representativeId)) {
//       newErrors.representativeId = "CCCD phải từ 9-12 số";
//     }
//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Email không hợp lệ";
//     }
//     if (!/^[0-9]{9,11}$/.test(formData.phone)) {
//       newErrors.phone = "Số điện thoại không hợp lệ";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : type === "file"
//             ? files[0]
//             : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     alert("Doanh nghiệp đã được thêm thành công!");
//     navigate("/business");
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Thêm doanh nghiệp</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Thông tin người quản lý */}
//         <div className="bg-white p-4 rounded-lg shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Thông tin người quản lý
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1">Tài khoản quản lý</label>
//               <input
//                 type="text"
//                 name="managerAccount"
//                 value={formData.owner}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Tên người quản lý</label>
//               <input
//                 type="text"
//                 name="ownerName"
//                 value={formData.ownerName}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Thông tin doanh nghiệp */}
//         <div className="bg-white p-4 rounded-lg shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Thông tin doanh nghiệp
//           </h2>

//           {/* Loại hình + MST */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1">Loại hình</label>
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               >
//                 <option value="TC">Tổ chức</option>
//                 <option value="HKD">Hộ kinh doanh</option>
//               </select>
//             </div>

//             <div>
//               <label className="block mb-1">MST</label>
//               <input
//                 type="text"
//                 name="taxId"
//                 value={formData.taxId}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//               {errors.taxId && (
//                 <p className="text-red-500 text-sm">{errors.taxId}</p>
//               )}
//             </div>
//           </div>
//           {/* Tên doanh nghiệp */}
//           <div>
//             <label className="block mb-1">Tên doanh nghiệp</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>

//           {/* Mã GPKD + File Upload + Ngày ĐK */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block mb-1">Mã GPKD</label>
//               <input
//                 type="text"
//                 name="licenseCode"
//                 value={formData.licenseCode}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">File GPKD (PDF)</label>
//               <input
//                 type="file"
//                 name="licenseFile"
//                 accept="application/pdf"
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Ngày đăng ký KD</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//             </div>
//           </div>

//           {/* Địa chỉ */}
//           <div>
//             <label className="block mb-1">Địa chỉ</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               rows={2}
//               required
//             />
//           </div>

//           {/* SĐT + Email */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1">Số điện thoại doanh nghiệp</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm">{errors.phone}</p>
//               )}
//             </div>

//             <div>
//               <label className="block mb-1">Email doanh nghiệp</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>
//           </div>

//           {/* Trạng thái */}
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="active"
//               checked={formData.active}
//               onChange={handleChange}
//             />
//             <span>Đang hoạt động</span>
//           </div>
//         </div>

//         {/* Thông tin người đại diện */}
//         <div className="bg-white p-4 rounded-lg shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Thông tin người đại diện
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1">CCCD</label>
//               <input
//                 type="text"
//                 name="representativeId"
//                 value={formData.representativeId}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//               {errors.representativeId && (
//                 <p className="text-red-500 text-sm">{errors.representativeId}</p>
//               )}
//             </div>
//             <div>
//               <label className="block mb-1">Tên người đại diện</label>
//               <input
//                 type="text"
//                 name="representativeName"
//                 value={formData.representativeName}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
//           >
//             <Save className="w-4 h-4" />
//             Lưu doanh nghiệp
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save } from "lucide-react";
import { getCustomerById } from "~/services/customerAPI";
import { getBusinessById, createBusiness, updateBusiness } from "~/services/businessAPI";

export default function BusinessForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // nếu có id => edit mode
  

  const [formData, setFormData] = useState({
    owner: "",
    ownerName: "",
    name: "",
    type: "TC",
    taxId: "",
    licenseCode: "",
    licenseFile: null,
    startDate: "",
    address: "",
    phone: "",
    email: "",
    representativeId: "",
    representativeName: "",
    active: true,
    cusId: null,
  });

  const [errors, setErrors] = useState({});
  const [showRepresentative, setShowRepresentative] = useState(false);
  const [cusIdInput, setCusIdInput] = useState("");

  // Lấy thông tin user & nếu edit thì load dữ liệu cũ
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prev) => ({
        ...prev,
        owner: user.userId || "",
        ownerName: user.name,
      }));
    }

    if (id) {
      // edit mode → gọi API lấy business
      (async () => {
        const res = await getBusinessById(id);
        if (res?.data?.data) {
          setFormData(res.data.data);
          if (res.data.data.cusId) {
            setCusIdInput(res.data.data.cusId);
            setShowRepresentative(true);
          }
        }
      })();
    }
  }, [id]);

  // Debounce khi nhập cusId
  useEffect(() => {
    if (!cusIdInput) return;
    const timeout = setTimeout(() => {
      fetchCustomer(cusIdInput);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [cusIdInput]);

  const fetchCustomer = async (cusId) => {
    if (!cusId) return;
    try {
      const res = await getCustomerById(cusId);
      const data = res.data?.data;
      if (!data) {
        setFormData((prev) => ({
          ...prev,
          cusId: "",
          representativeId: "",
          representativeName: "",
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        cusId: data.cusId,
        representativeId: data.citizenId,
        representativeName: data.firstName + " " + data.lastName,
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Tên doanh nghiệp là bắt buộc";
    if (!formData.address?.trim()) newErrors.address = "Địa chỉ là bắt buộc";
    if (formData.taxId && !/^[0-9]{9,12}$/.test(formData.taxId)) {
      newErrors.taxId = "MST phải từ 9-12 chữ số";
    }
    if (
      showRepresentative &&
      formData.representativeId &&
      !/^[0-9]{9,12}$/.test(formData.representativeId)
    ) {
      newErrors.representativeId = "CCCD phải từ 9-12 số";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (formData.phone && !/^[0-9]{9,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // realtime validate
    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: newValue.trim() ? "" : "Tên doanh nghiệp là bắt buộc",
      }));
    }
    if (name === "address") {
      setErrors((prev) => ({
        ...prev,
        address: newValue.trim() ? "" : "Địa chỉ là bắt buộc",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (id) {
        await updateBusiness(id, formData);
        alert("Cập nhật doanh nghiệp thành công!");
      } else {
        await createBusiness(formData);
        alert("Thêm doanh nghiệp thành công!");
      }
      navigate("/business");
    } catch (error) {
      alert("Lỗi khi lưu doanh nghiệp!");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Chỉnh sửa doanh nghiệp" : "Thêm doanh nghiệp"}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/business")}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Quay lại
        </button>
      </div>
      <div className="space-y-6">
        {/* Thông tin người quản lý */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Thông tin người quản lý
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Tài khoản quản lý</label>
              <input
                type="text"
                name="owner"
                readOnly
                value={formData.owner}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded cursor-not-allowed bg-gray-100"

              />
            </div>
            <div>
              <label className="block mb-1">Tên người quản lý</label>
              <input
                type="text"
                name="ownerName"
                readOnly
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded cursor-not-allowed bg-gray-100"

              />
            </div>
          </div>
        </div>

        {/* Thông tin doanh nghiệp */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Thông tin doanh nghiệp
          </h2>
          {/* Loại hình + MST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Loại hình</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-3 py-2.5 rounded"
              >
                <option value="TC">Tổ chức</option>
                <option value="HKD">Hộ kinh doanh</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">MST</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"

              />
              {errors.taxId && (
                <p className="text-red-500 text-sm">{errors.taxId}</p>
              )}
            </div>
          </div>

          {/* Tên doanh nghiệp */}
          <div>
            <label className="block mb-1">Tên doanh nghiệp</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Mã GPKD + File Upload + Ngày ĐK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Mã GPKD</label>
              <input
                type="text"
                name="licenseCode"
                value={formData.licenseCode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">File GPKD (PDF)</label>
              <input
                type="file"
                name="licenseFile"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full border px-3 py-1.5 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Ngày đăng ký KD</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"

              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block mb-1">Địa chỉ</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows={2}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* SĐT + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Số điện thoại doanh nghiệp</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"

              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Email doanh nghiệp</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Trạng thái */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <span>Đang hoạt động</span>
          </div>
        </div>

        {/* Toggle thông tin người đại diện */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showRepresentative}
            onChange={(e) => setShowRepresentative(e.target.checked)}
          />
          <span>Thêm thông tin người đại diện</span>
        </div>

        {/* Thông tin người đại diện (ẩn/hiện theo checkbox) */}
        {showRepresentative && (
          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Thông tin người đại diện
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mã khách hàng (readonly) */}
              <div>
                <label className="block mb-1">Mã khách hàng</label>
                <input
                  type="text"
                  name="cusId"
                  placeholder="Nhập mã khách hàng để tìm"
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                  value={cusIdInput}
                  onChange={(e) => setCusIdInput(e.target.value.toUpperCase())}
                  onBlur={() => fetchCustomer(cusIdInput)}   // chỉ gọi khi blur
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await fetchCustomer(cusIdInput); // gọi khi Enter
                    }
                  }}
                />
              </div>
              <div>
                <label className="block mb-1">CCCD</label>
                <input
                  type="text"
                  name="representativeId"
                  placeholder="Nhập CCCD để tìm"
                  value={formData.representativeId}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                // required={showRepresentative}
                />
                {errors.representativeId && (
                  <p className="text-red-500 text-sm">{errors.representativeId}</p>
                )}
              </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block mb-1">Họ và Tên</label>
                <input
                  type="text"
                  name="representativeLastName"
                  readOnly
                  placeholder="Chưa có dữ liệu"
                  value={formData.representativeName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                // required={showRepresentative}
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/customers")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            {id ? "Cập nhật" : "Tạo doanh nghiệp"}
          </button>
        </div>
      </div>
    </div>
  );
}
