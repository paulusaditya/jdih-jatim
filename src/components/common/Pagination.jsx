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

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center p-4 mt-5 w-full text-center rounded-lg bg-zinc-100 max-md:max-w-full">
      <div className="flex gap-2 justify-center items-center text-sm font-medium leading-6 whitespace-nowrap text-zinc-800 overflow-x-auto">
        <ChevronLeft
          className={`cursor-pointer transition ${
            currentPage === 1 ? "text-gray-400" : "text-blue-600 hover:text-blue-800"
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`px-2 py-1 rounded-md cursor-pointer transition ${
              currentPage === i + 1
                ? "bg-blue-100 font-bold text-blue-600"
                : "text-zinc-800 hover:bg-zinc-200"
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </div>
        ))}
        <ChevronRight
          className={`cursor-pointer transition ${
            currentPage === totalPages ? "text-gray-400" : "text-blue-600 hover:text-blue-800"
          }`}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        />
      </div>

      <div className="text-xs text-zinc-800">
        {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} dari {totalItems} record
      </div>
    </div>
  );
};

export default Pagination;
