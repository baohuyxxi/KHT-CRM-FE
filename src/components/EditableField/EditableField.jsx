import React, { useState, useRef, useEffect } from "react";

export default function EditableField({ value, onChange, multiline = false, className }) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);

  // Tự động resize textarea
  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // reset height
      el.style.height = el.scrollHeight + "px"; // set height = scrollHeight
    }
  };

  useEffect(() => {
    if (editing && multiline && textareaRef.current) {
      resizeTextarea(); // khi bật edit lần đầu
      textareaRef.current.focus();
    }
  }, [editing, multiline]);

  const handleChange = (val) => {
    onChange(val);
    if (multiline) resizeTextarea();
  };

  const handleBlur = () => setEditing(false);

  return (
    <div className={`relative group cursor-pointer break-words ${className}`}>
      {!editing && (
        <div
          className="break-words border-b border-[transparent] focus:outline-none"
          onClick={() => setEditing(true)}
        >
          {value || ""}
          <span className="ml-1 text-gray-400 group-hover:text-blue-500">
            <i className="fa fa-pen text-xs"></i>
          </span>
        </div>
      )}

      {editing &&
        (multiline ? (
          <textarea
            ref={textareaRef}
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none resize-none break-words overflow-hidden"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <input
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none break-words"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        ))}
    </div>
  );
}
