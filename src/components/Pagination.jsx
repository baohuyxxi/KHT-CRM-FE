import { Pagination } from "@mui/material";
export default function PaginationUI({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center py-6">
      <Pagination
        count={totalPages || 1} // ✅ đảm bảo không undefined
        page={currentPage}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        variant="outlined"
        shape="rounded"
        siblingCount={1} // hiển thị số trang liền kề
        boundaryCount={1} // hiển thị trang đầu & cuối
      />
    </div>
  );
}

