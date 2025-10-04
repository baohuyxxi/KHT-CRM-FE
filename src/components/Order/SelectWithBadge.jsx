import React from "react";
import Select from "react-select";

export default function SelectWithBadge({ options, value, onChange }) {
  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <Select
      value={selected}
      onChange={(opt) => onChange(opt?.value || "")}
      options={options}
      // Hiển thị option trong dropdown
      getOptionLabel={(e) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${e.color}`}
        >
          {e.label}
        </span>
      )}
      // Hiển thị giá trị đang chọn
      getValueLabel={(e) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${e.color}`}
        >
          {e.label}
        </span>
      )}
      className="w-full text-sm"
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "32px",
        }),
        singleValue: (base) => ({
          ...base,
          display: "flex",
          alignItems: "center",
        }),
        option: (base) => ({
          ...base,
          display: "flex",
          alignItems: "center",
        }),
      }}
    />
  );
}
