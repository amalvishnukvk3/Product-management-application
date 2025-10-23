// @ts-nocheck
export default function Pagination() {
  const pages = [1, 2, 3, 4, 5, "...", 10];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-2 md:gap-0">
      
      {/* Items info */}
      <p className="text-sm text-gray-500">10 of 456 items</p>
      
      {/* Page buttons */}
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
        {pages.map((num, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-full text-sm md:text-base ${
              num === 1 ? "bg-[#F6A01A] text-white" : "bg-white border"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Rows info */}
      <p className="text-sm text-gray-500">
        Show <span className="font-semibold">10 rows</span>
      </p>
    </div>
  );
}
