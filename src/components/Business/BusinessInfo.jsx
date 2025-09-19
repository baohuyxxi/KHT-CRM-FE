export function BusinessInfo({ formData, errors, handleChange }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Thông tin doanh nghiệp</h2>

            {/* Loại hình + MST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">Loại hình</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
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
                        className="w-full border px-2 py-1 rounded"
                    />
                    {errors.taxId && <p className="text-red-500 text-sm">{errors.taxId}</p>}
                </div>
            </div>

            {/* Tên doanh nghiệp */}
            <div>
                <label className="block mb-1">Tên doanh nghiệp</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name.toLocaleUpperCase()}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Mã GPKD + File + Ngày */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1">Mã GPKD</label>
                    <input
                        type="text"
                        name="licenseCode"
                        value={formData.licenseCode}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">File GPKD (PDF)</label>

                    {/* Nếu đã có link cũ thì hiển thị */}
                    {formData.licenseFile && typeof formData.licenseFile === "string" && (
                        <div className="flex items-center gap-2 mb-2">
                            <a
                                href={formData.licenseFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Xem file hiện tại
                            </a>
                            <span className="text-gray-500">(có thể chọn file mới để thay thế)</span>
                        </div>
                    )}

                    <input
                        type="file"
                        name="licenseFile"
                        accept="application/pdf"
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Ngày đăng ký KD</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
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
                    className="w-full border px-2 py-1 rounded"
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
                        className="w-full border px-2 py-1 rounded"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block mb-1">Email doanh nghiệp</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
    );
}