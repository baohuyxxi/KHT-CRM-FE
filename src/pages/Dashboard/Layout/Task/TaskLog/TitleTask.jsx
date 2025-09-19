import React, { useState } from "react";

export default function TitleTask({ task }) {
  const [previewImg, setPreviewImg] = useState(null);

  if (!task) return null;

  return (
    <>
      <div className="border p-4 rounded bg-white shadow grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái: thông tin task */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <p>
            <strong>Chi tiết:</strong> {task.details || "Chưa có chi tiết"}
          </p>

          <p>
            <strong>Trạng thái:</strong>{" "}
            <span
              className={`capitalize px-2 py-1 rounded ${
                task.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : task.status === "in_progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.status.replace("_", " ")}
            </span>
          </p>

          {task.assigneeIds?.length > 0 && (
            <p>
              <strong>Người được giao:</strong> {task.assigneeIds.join(", ")}
            </p>
          )}

          <p>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Cập nhật lần cuối:</strong>{" "}
            {new Date(task.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Cột phải: tài liệu */}
        <div className="space-y-4">
          {/* Ảnh */}
          {task.images?.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Hình ảnh</h3>
              <div className="flex gap-3 flex-wrap">
                {task.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative border rounded overflow-hidden group cursor-pointer"
                    onClick={() => setPreviewImg(img)}
                  >
                    <img
                      src={img}
                      alt={`Hình ${idx + 1}`}
                      className="w-32 h-32 object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // tránh mở preview
                        const link = document.createElement("a");
                        link.href = img;
                        link.download = `image-${idx + 1}.jpg`;
                        link.click();
                      }}
                      className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      Lưu
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PDF */}
          {task.pdfs?.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Tài liệu PDF</h3>
              <div className="flex flex-col gap-2">
                {task.pdfs.map((pdf, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border p-2 rounded hover:bg-gray-50"
                  >
                    <a
                      href={pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-blue-600 underline truncate"
                    >
                      Xem PDF {idx + 1}
                    </a>
                    <a
                      href={pdf}
                      download
                      className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                    >
                      Lưu
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Preview ảnh */}
      {previewImg && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={previewImg}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            />
            <button
              onClick={() => setPreviewImg(null)}
              className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
