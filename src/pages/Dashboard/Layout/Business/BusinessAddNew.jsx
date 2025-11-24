import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCustomerById } from "~/services/customerAPI";
import { getBusinessById, createBusiness, updateBusiness } from "~/services/businessAPI";
import { BusinessInfo } from "~/components/Business/BusinessInfo";
import { ManagerInfo } from "~/components/Business/ManagerInfo";
import { RepresentativeInfo } from "~/components/Business/RepresentativeInfo";
import { FormActions } from "~/components/Business/FormActions";

export default function BusinessForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // nếu có id => edit mode
  const { cusId } = useLocation().state || {}; // nếu có cusId => từ KH chuyển sang


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
    stamp: [],
    notes: "",
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

    if (cusId) {
      setCusIdInput(cusId);
      setShowRepresentative(true);
      fetchCustomer(cusId);
      setFormData((prev) => ({ ...prev, cusId: cusId }));
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

    let newValue = value;

    if (type === "checkbox") {
      newValue = checked;
    }

    if (type === "file") {
      const newFiles = Array.from(files); // list file mới

      newValue = [...(formData.stamp || []), ...newFiles]; // giữ file cũ + mới
    }

    if (name === "name") {
      newValue = newValue.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
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
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {id ? "Chỉnh sửa doanh nghiệp" : "Thêm doanh nghiệp"}
        </h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Người quản lý */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Thông tin người quản lý</h2>

          <ManagerInfo formData={formData} handleChange={handleChange} />
        </div>

        {/* Doanh nghiệp */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Thông tin doanh nghiệp</h2>

          <BusinessInfo
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        </div>

        {/* Upload file */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Con dấu/chữ ký</h2>

          {/* Upload box */}
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
            <div className="text-gray-500 text-sm">Nhấn để chọn hoặc kéo thả file</div>
            <input
              type="file"
              accept="image/*"
              name="stamp"
              multiple
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {Array.isArray(formData.stamp) && formData.stamp.length > 0 && (
            <div className="space-y-2">
              {formData.stamp.map((file, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg text-sm">

                  <span className="truncate w-3/4">
                    {file.name || file}
                    {/* nếu là file object => file.name, nếu là URL string => file */}
                  </span>

                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        stamp: prev.stamp.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    Xoá
                  </button>

                </div>
              ))}
            </div>
          )}
          {/* Ghi chú */}
          <div>
            <label className="font-medium text-gray-700">Ghi chú</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Nhập ghi chú..."
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Toggle */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showRepresentative}
              onChange={(e) => setShowRepresentative(e.target.checked)}
            />
            <span className="text-gray-700 font-medium">Thêm thông tin người đại diện</span>
          </div>

          {/* Representative */}
          <RepresentativeInfo
            show={showRepresentative}
            formData={formData}
            cusIdInput={cusIdInput}
            setCusIdInput={setCusIdInput}
            fetchCustomer={fetchCustomer}
            handleChange={handleChange}
            errors={errors}
          />
        </div>

        {/* Action buttons */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <FormActions
            id={id}
            handleSubmit={handleSubmit}
            navigate={navigate}
          />
        </div>

      </form>
    </div>
  );

}
