import React, { createContext, useState, useContext, useEffect } from "react";
import { Loader2 } from "lucide-react"; // icon đẹp

const LoadingContext = createContext();

// biến toàn cục để lưu hàm toggle
let globalToggleLoading = () => {
  console.warn("globalLoading được gọi trước khi Provider khởi tạo!");
};

// export globalLoading để dùng toàn app
export const globalLoading = (state, message) => {
  globalToggleLoading(state, message);
};

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Đang tải");

  useEffect(() => {
    // gán hàm toggle cho biến toàn cục
    globalToggleLoading = (state, message) => {
      setIsLoading(state);
      setLoadingMessage(message);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[9999]">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fadeIn">
            {/* Icon Loader */}
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-3" />
            
            {/* Text */}
            <p className="text-gray-800 font-semibold text-lg tracking-wide">
              {loadingMessage} 
            </p>
            
            {/* Thanh progress giả */}
            <div className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-primary animate-progress"></div>
            </div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

// hook (nếu cần)
export const useLoading = () => useContext(LoadingContext);
