export default function StampModal({ business, onClose }) {
  if (!business) return null;

  const stamps = business.stamp || []; // array chứa URL ảnh

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto shadow-xl">
        
        <h2 className="text-xl font-semibold mb-2">
          Con dấu chữ ký – {business.name}
        </h2>

        {/* Hiển thị note nếu có */}
        {business.notes && (
          <p className="text-gray-600 mb-4 border-l-4 border-blue-400 pl-3 whitespace-pre-wrap">
            {business.notes}
          </p>
        )}

        {stamps.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Doanh nghiệp chưa có con dấu / chữ ký
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {stamps.map((url, idx) => (
              <div key={idx} className="border rounded-lg p-2">
                <img
                  src={url}
                  alt={`stamp-${idx}`}
                  className="w-full h-40 object-contain"
                />
              </div>
            ))}
          </div>
        )}

        <button
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg w-full"
          onClick={onClose}
        >
          Đóng
        </button>

      </div>
    </div>
  );
}
