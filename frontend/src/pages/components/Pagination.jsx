import { useContext } from "react";
import { ThemeContext } from "../../context/WishlistContext";

// @ts-nocheck
export default function Pagination() {
  const { page, updatePage, totalPages, updateTotalPages } = useContext(ThemeContext);

  const handlePrev = () => {
    if (page > 1) updatePage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) updatePage(page + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => updatePage(i)}
          className={`px-3 py-1 rounded-full text-sm ${page === i ? "bg-[#F6A01A] text-white" : "bg-white border"
            }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-2 md:gap-0">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <p className="text-sm text-gray-500">Show 10 rows</p>
    </div>
  );
}
