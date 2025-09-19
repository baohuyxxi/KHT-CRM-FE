import React, { useState } from "react";
import ImageUploader from "~/components/ImageUploader";

export default function SigningForm() {
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");

  return (
    <div className="mt-2 space-y-4">
      {/* Input chi tiết đấu nối */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Thông tin đấu nối
        </label>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập thông tin chữ ký số & hóa đơn"
        />
      </div>

      {/* Upload ảnh */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Hình ảnh
        </label>
        <ImageUploader
          images={images}
          onChange={setImages}
          size="w-28 h-28 md:w-32 md:h-32"
        />
      </div>
    </div>
  );
}
