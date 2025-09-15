export default function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-semibold">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="border rounded p-2 w-full h-24"
      />
    </div>
  );
}
