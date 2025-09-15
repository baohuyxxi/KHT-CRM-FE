import React, { useState } from "react";

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div>
      {children.map((child, index) => {
        if (child.type.displayName === "TabsList") {
          return React.cloneElement(child, { key: index, activeTab, setActiveTab });
        }
        if (child.type.displayName === "TabsContent") {
          return child.props.value === activeTab ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 border-b mb-4">
      {children.map((child, index) =>
        React.cloneElement(child, { key: index, activeTab, setActiveTab })
      )}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-t ${
        isActive ? "bg-white border border-b-0" : "bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}
TabsContent.displayName = "TabsContent";
