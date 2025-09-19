export function FormActions({ id, handleSubmit, navigate }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        Hủy
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
      >
        {id ? "Cập nhật" : "Tạo doanh nghiệp"}
      </button>
    </div>
  );
}