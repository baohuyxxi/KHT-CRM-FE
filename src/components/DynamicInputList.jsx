export default function DynamicInputList({
  label = "Danh sách",
  placeholder = "Nhập nội dung...",
  addText = "+ Thêm",
  values = [],
  onChange,
}) {
  const handlePasteOrEnter = (e, index) => {
    // Xử lý dán nhiều dòng
    if (e.type === "paste") {
      const paste = e.clipboardData.getData("text");
      const lines = paste.split(/\r?\n/).filter((line) => line.trim() !== "");

      if (lines.length > 1) {
        e.preventDefault();
        const newList = [...values];
        newList[index] = lines[0]; // dòng đầu thay thế
        onChange([...newList, ...lines.slice(1)]); // thêm các dòng sau
      }
    }

    // Xử lý nhấn Enter (xuống dòng)
    if (e.type === "keydown" && e.key === "Enter") {
      e.preventDefault();
      const newList = [...values];
      newList.splice(index + 1, 0, "");
      onChange(newList);
    }
  };

  // Nếu rỗng thì render sẵn 1 ô
  const list = values.length > 0 ? values : [""];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">{label}</label>
      {list.map((val, i) => (
        <div key={i} className="flex gap-2 items-center mb-2">
          <input
            type="text"
            value={val}
            placeholder={placeholder}
            onChange={(e) => {
              const newList = [...list];
              newList[i] = e.target.value;
              onChange(newList);
            }}
            onPaste={(e) => handlePasteOrEnter(e, i)}
            onKeyDown={(e) => handlePasteOrEnter(e, i)}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={() => onChange(list.filter((_, idx) => idx !== i))}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Xoá
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...list, ""])}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        {addText}
      </button>
    </div>
  );
}
