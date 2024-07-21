import React from "react";

export default function Pagination({
  setCurrentPage,
  visiblePageNumbers,
  currentPage,
  totalPages,
  isListLoading,
}) {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
        {"<<"}
      </button>
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <div className="flex gap-2">
        {visiblePageNumbers?.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={
              number === currentPage
                ? "font-bold text-black"
                : "text-normal text-gray-400"
            }
            disabled={number === currentPage || isListLoading}
          >
            {number}
          </button>
        ))}
        {visiblePageNumbers[visiblePageNumbers.length - 1] ===
        totalPages ? null : (
          <span>...</span>
        )}
      </div>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
}
