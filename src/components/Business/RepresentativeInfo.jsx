export function RepresentativeInfo({ show, formData, cusIdInput, setCusIdInput, fetchCustomer, handleChange, errors }) {
  if (!show) return null;
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">Thông tin người đại diện</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Mã khách hàng</label>
          <input
            type="text"
            name="cusId"
            placeholder="Nhập mã khách hàng để tìm"
            className="w-full border px-2 py-1 rounded bg-gray-100"
            value={cusIdInput}
            onChange={(e) => setCusIdInput(e.target.value.toUpperCase())}
            onBlur={() => fetchCustomer(cusIdInput)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await fetchCustomer(cusIdInput);
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
            className="w-full border px-2 py-1 rounded"
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
            className="w-full border px-2 py-1 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
