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
    <div className="flex flex-wrap gap-10 justify-between items-center p-3 mt-5 w-full text-center rounded-lg bg-zinc-100 max-md:max-w-full">
      <div className="flex gap-4 justify-center items-center self-stretch my-auto text-sm font-medium leading-6 whitespace-nowrap min-w-[240px] text-zinc-800">
        <ChevronLeft
          className={`cursor-pointer ${
            currentPage === 1 ? "text-gray-400" : "text-blue-600"
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`self-stretch my-auto w-[31px] text-center cursor-pointer ${
              currentPage === i + 1
                ? "font-bold text-blue-600"
                : "text-zinc-800"
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </div>
        ))}
        <ChevronRight
          className={`cursor-pointer ${
            currentPage === totalPages ? "text-gray-400" : "text-blue-600"
          }`}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        />
      </div>
      <div className="self-stretch my-auto text-xs text-zinc-800">
        {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} dari{" "}
        {totalItems} record
      </div>
    </div>
  );
};

export default Pagination;
