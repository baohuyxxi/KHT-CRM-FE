/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0866FF", // Xanh dương (chủ đạo)
        primaryDark: "#0074BD",
        secondary: "#F59E0B", // Cam / vàng (CTA, nhấn mạnh)
        light: "#F9FAFB", // Nền chính sáng
        darkText: "#111827", // Text chính
        mutedText: "#6B7280", // Text phụ / secondary
        bgPrimary: "#F9FAFB", // Nền chính
        cardBg: "#FFFFFF", // Card / paper background
        cardBorder: "#E5E7EB", // Border / outline
        hover: "#F3F4F6", // Hover / background nhẹ
        error: "#EF4444", // Lỗi / cảnh báo
        success: "#10B981", // Thành công
        info: "#3B82F6", // Thông tin
        warning: "#F59E0B", // Cảnh báo
        accentBlue: "#1D4ED8", // Dùng cho nút phụ / highlight
        accentGray: "#9CA3AF", // Dùng cho text phụ, icon
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        cardHover: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
