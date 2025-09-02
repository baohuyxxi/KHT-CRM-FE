import React from "react";

const InfoList = ({ items = [], className = "" }) => {
  if (!items.length) return null;

  return (
    <ul className={`list-disc list-inside space-y-2 text-gray-600 ${className}`}>
      {items.map((item, i) => (
        <li key={i}>
          {item.key && <span className="font-semibold">{item.key}: </span>}
          {item.value}
        </li>
      ))}
    </ul>
  );
};

export default InfoList;
