import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images = [], alt = "image", className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className={`flex justify-center items-center h-96 bg-gray-50 ${className}`}>
        <img src="/no-image.png" alt="No image" className="h-full object-contain" />
      </div>
    );
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      {/* Khung cố định chiều cao */}
      <div className="h-96 w-full flex justify-center items-center bg-gray-50 rounded-lg">
        <img
          src={images[currentIndex]}
          alt={alt}
          className="h-full object-contain"
        />
      </div>

      {/* Nút chuyển trái/phải */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-orange-200 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-orange-200 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Chỉ báo dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
