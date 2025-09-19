import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { uploadPDF } from "~/services/uploadAPI";

export default function UploadGPKD({ onUpload }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click(); // Mở chọn file
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Chỉ chấp nhận file PDF!");
      return;
    }

    setUploading(true);
    try {
      //Lấy ngày giờ làm tên file
      const timestamp = Date.now();
      const fileName = `GPKD_${timestamp}`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);

      // Ví dụ API upload lên server
      const res = await uploadPDF(formData);
      if (res?.data) {
        onUpload(res.data.data.url); // trả link file cho parent
      } else {
        alert("Upload thất bại!");
      }
    } catch (err) {
      alert("Lỗi upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        title="upload GPKD"
        className="ml-3 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
      >
        {uploading ? "Đang tải..." :
          <Upload className="w-5 h-5 text-orange-500"/>}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
