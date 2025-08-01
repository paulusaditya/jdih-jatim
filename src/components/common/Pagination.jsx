  import React from "react";
  import { ChevronLeft, ChevronRight } from "lucide-react";

  const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;

    const getVisiblePages = () => {
      const visiblePages = [];
      const maxVisible = 3; 
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = startPage + maxVisible - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      return visiblePages;
    };

    const visiblePages = getVisiblePages();

    return (
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center p-4 mt-5 w-full text-center rounded-lg bg-zinc-100 max-md:max-w-full">
        <div className="flex gap-2 justify-center items-center text-sm font-medium leading-6 whitespace-nowrap text-zinc-800 overflow-x-auto">
          <ChevronLeft
            className={`cursor-pointer transition ${
              currentPage === 1
                ? "text-gray-400"
                : "text-green-600 hover:text-green-800"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />

          {visiblePages[0] > 1 && (
            <>
              <div
                className="px-2 py-1 rounded-md cursor-pointer transition text-zinc-800 hover:bg-zinc-200"
                onClick={() => onPageChange(1)}
              >
                1
              </div>
              {visiblePages[0] > 2 && <span className="text-zinc-500">...</span>}
            </>
          )}

          {visiblePages.map((page) => (
            <div
              key={page}
              className={`px-2 py-1 rounded-md cursor-pointer transition ${
                currentPage === page
                  ? "bg-green-100 font-bold text-green-600"
                  : "text-zinc-800 hover:bg-zinc-200"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </div>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="text-zinc-500">...</span>
              )}
              <div
                className="px-2 py-1 rounded-md cursor-pointer transition text-zinc-800 hover:bg-zinc-200"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </div>
            </>
          )}

          <ChevronRight
            className={`cursor-pointer transition ${
              currentPage === totalPages
                ? "text-gray-400"
                : "text-green-600 hover:text-green-800"
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </div>

        <div className="text-xs text-zinc-800">
          {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} dari{" "}
          {totalItems} record
        </div>
      </div>
    );
  };

  export default Pagination;
