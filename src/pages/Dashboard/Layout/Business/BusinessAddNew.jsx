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
    let newValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;

    // Nếu là tên doanh nghiệp, lưu luôn chữ hoa
    if (name === "name") {
      newValue = newValue.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));

    // Realtime validate
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {id ? "Chỉnh sửa doanh nghiệp" : "Thêm doanh nghiệp"}
        </h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Quay lại
        </button>
      </div>

      <div className="space-y-6">
        {/* Thông tin người quản lý */}
        <ManagerInfo formData={formData} handleChange={handleChange} />

        {/* Thông tin doanh nghiệp */}
        <BusinessInfo
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />

        {/* Toggle thông tin người đại diện */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showRepresentative}
            onChange={(e) => setShowRepresentative(e.target.checked)}
          />
          <span>Thêm thông tin người đại diện</span>
        </div>

        {/* Thông tin người đại diện */}
        <RepresentativeInfo
          show={showRepresentative}
          formData={formData}
          cusIdInput={cusIdInput}
          setCusIdInput={setCusIdInput}
          fetchCustomer={fetchCustomer}
          handleChange={handleChange}
          errors={errors}
        />

        {/* Action buttons */}
        <FormActions
          id={id}
          handleSubmit={handleSubmit}
          navigate={navigate}
        />
      </div>
    </div>
  );
}
