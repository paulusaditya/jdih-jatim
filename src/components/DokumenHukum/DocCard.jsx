import * as React from "react";
import { ChevronRight } from "lucide-react";

function StatusBadge({ children, loading = false }) {
  if (loading) {
    return (
      <div className="h-7 bg-gray-200 rounded-full w-20 animate-pulse"></div>
    );
  }

  return (
    <div
      className="gap-2 self-stretch px-4 py-1 my-auto whitespace-nowrap"
      style={{
        backgroundColor: "rgba(22, 163, 74, 0.16)",
        color: "#15803d",
        border: "1px solid #15803d",
        borderRadius: "9999px",
      }}
    >
      {children}
    </div>
  );
}

function DocCard({
  title,
  year,
  status,
  category,
  type,
  number,
  onDetailClick,
  image,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 items-start p-6 mt-5 w-full rounded-xl border border-gray-200 animate-pulse max-md:px-5 max-md:max-w-full">
        {/* Image skeleton */}
        <div className="w-[100px] h-[151px] bg-gray-200 rounded-lg"></div>

        {/* Content skeleton */}
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-8 min-w-[240px] max-md:max-w-full">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-16"></div>

          {/* Badges skeleton */}
          <div className="flex flex-wrap gap-2 justify-start items-center self-start">
            <StatusBadge loading={true} />
            <StatusBadge loading={true} />
            <StatusBadge loading={true} />
            <StatusBadge loading={true} />
            <StatusBadge loading={true} />
          </div>
        </div>

        {/* Detail button skeleton */}
        <div className="h-12 bg-gray-200 rounded-xl w-24"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start p-6 mt-5 w-full rounded-xl border border-green-600 border-solid max-md:px-5 max-md:max-w-full hover:shadow-md transition-shadow">
      <img
        src={
          image ||
          "https://jdih.pisdev.my.id/uploads/default_document_image.png"
        }
        alt={title}
        className="w-[100px] h-[151px] rounded-lg object-cover md:mr-4"
      />
      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-8 min-w-[240px] max-md:max-w-full">
        <div className="text-base font-bold leading-6 text-zinc-800 max-md:max-w-full mb-4 md:mb-16">
          {title}
        </div>
        <div className="flex flex-wrap gap-2 justify-start items-center self-start text-sm text-left text-green-950">
          {status && <StatusBadge>{status}</StatusBadge>}
          {year && <StatusBadge>{year}</StatusBadge>}
          {category && <StatusBadge>{category}</StatusBadge>}
          {type && <StatusBadge>{type}</StatusBadge>}
          {number && <StatusBadge>{number}</StatusBadge>}
        </div>
      </div>
      <div
        className="flex gap-2 justify-center items-center self-stretch px-4 py-3 my-auto text-sm font-semibold leading-6 text-green-600 whitespace-nowrap rounded-xl w-[95px] cursor-pointer hover:bg-green-50 transition-colors"
        onClick={onDetailClick}
      >
        <div className="self-stretch my-auto">Detail</div>
        <ChevronRight className="w-4 h-4 text-green-600" />
      </div>
    </div>
  );
}

export default DocCard;
