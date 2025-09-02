// InputField.jsx
export default function InputField({ label, type = "text", value, onChange, isMoney }) {
  const formatMoney = (num) => {
    if (num === "" || num === null || num === undefined) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    if (!isNaN(rawValue)) {
      onChange(Number(rawValue)); // gọi onChange với giá trị số
    }
  };

  return (
    <div>
      <label className="block font-semibold">{label}</label>
      <input
        type="text" // luôn để text để hiển thị định dạng
        value={isMoney ? formatMoney(value) : value}
        onChange={isMoney ? handleChange : onChange}
        className="border rounded p-2 w-full"
      />
    </div>
  );
}
