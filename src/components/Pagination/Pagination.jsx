export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleChangePage = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center mt-10">
      <ul className="flex space-x-2 text-gray-700">
        {/* Prev */}
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            « Trước
          </button>
        </li>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => handleChangePage(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handleChangePage(currentPage + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            Sau »
          </button>
        </li>
      </ul>
    </div>
  );
}

