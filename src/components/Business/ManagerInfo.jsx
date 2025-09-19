export function ManagerInfo({ formData, handleChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">Thông tin người quản lý</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Tài khoản quản lý</label>
          <input
            type="text"
            name="owner"
            readOnly
            value={formData.owner}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded cursor-not-allowed bg-gray-100"
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
            className="w-full border px-2 py-1 rounded cursor-not-allowed bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}