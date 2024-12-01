import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPagesVisible = 4;
  const halfMaxPages = Math.floor(maxPagesVisible / 2);

  // Determine the range of visible pages
  let startPage = Math.max(currentPage - halfMaxPages, 1);
  const endPage = Math.min(startPage + maxPagesVisible - 1, totalPages);

  if (endPage - startPage < maxPagesVisible - 1) {
    startPage = Math.max(endPage - maxPagesVisible + 1, 1);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex items-center space-x-2" aria-label="Pagination">
      {/* Previous Button */}
      <button
        type="button"
        className={`flex items-center justify-center w-20 h-9 rounded-md text-sm ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="Previous"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <div className="flex items-center">
          <AiOutlineLeft className="mr-2" /> Previus
        </div>
      </button>

      {/* Page Buttons */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          type="button"
          className={`border border-gray-200  flex items-center justify-center w-9 h-9 rounded-md text-sm ${
            currentPage === startPage + index
              ? "bg-gray-800 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index}
        </button>
      ))}

      {/* Separator and Last Page */}
      {endPage < totalPages - 1 && (
        <span className=" flex items-center justify-center w-9 h-9 text-gray-400">
          ...
        </span>
      )}

      {endPage < totalPages && (
        <button
          type="button"
          className={`border border-gray-200 flex items-center justify-center w-9 h-9 rounded-md text-sm ${
            currentPage === totalPages
              ? "bg-gray-800 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        type="button"
        className={`flex items-center justify-center w-16 h-9 rounded-md text-sm ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="Next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <div className="flex items-center">
          Next <AiOutlineRight className="ml-2" />
        </div>
      </button>
    </nav>
  );
};

export default Pagination;
