import React, { useState, useRef, useEffect } from "react";
import { Pencil, Check, Loader2 } from "lucide-react";
import { uploadImage } from "~/services/uploadAPI";

export default function EditableImage({
  src,
  onChange,
  label = "Ảnh",
  className = "w-20 h-20",
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(src);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (typeof src === "object") {
      handleFileChange(src);
    }
  }, [src]);

  const handleFileChange = async (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setSuccess(false);

    try {
      const res = await uploadImage(file);
      const uploadedUrl = res.url || res.secure_url;
      if (uploadedUrl) {
        onChange(uploadedUrl);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000); // check hiện 2s
      } else {
        alert("❌ Upload thất bại, không có URL trả về");
      }
    } catch (err) {
      console.error("Upload image error:", err);
      alert("❌ Có lỗi khi upload ảnh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative ${className} cursor-pointer`}
      onClick={() => fileInputRef.current?.click()}
    >
      <img
        src={preview || ""}
        alt="Tải ảnh"
        className="w-full h-full object-cover rounded border bg-white"
      />

      {/* Icon chỉnh sửa */}
      <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
        <Pencil className="w-4 h-4 text-gray-600" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
        </div>
      )}
      {/* Success */}
      {!loading && success && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Check className="w-5 h-5 text-green-500" />
        </div>
      )}

      {/* Input file ẩn */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </div>
  );
}
