import * as React from "react";
import { ChevronRight } from "lucide-react";

function StatusBadge({ children, loading = false }) {
  if (loading) {
    return (
      <div className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
    );
  }

  return (
    <div
      className="gap-2 self-stretch px-4 py-1 my-auto whitespace-nowrap text-sm"
      style={{
        backgroundColor: "rgba(22, 163, 74, 0.16)",
        color: "#15803d",
        border: "1px solid #15803d",
        borderRadius: "9999px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function LawCard({
  number,
  title,
  year,
  status,
  type,
  onDetailClick,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-10 items-center p-6 mt-5 w-full rounded-xl border border-gray-200 animate-pulse max-md:px-5">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-full sm:basis-1/2 md:basis-1/3 min-w-0 md:min-w-[240px] max-w-full">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

          {/* Badges skeleton */}
          <div className="flex gap-2 flex-wrap items-center self-start mt-3">
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
    <div className="flex flex-wrap gap-10 items-center p-6 mt-5 w-full rounded-xl border border-green-600 border-solid max-md:px-5">
      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-full sm:basis-1/2 md:basis-1/3 min-w-0 md:min-w-[240px] max-w-full">
        <div className="text-base font-bold leading-6 text-zinc-800">
          {title}
        </div>
        <div className="flex gap-2 flex-wrap items-center self-start mt-3 text-center">
          {number && <StatusBadge>{number}</StatusBadge>}
          {year && <StatusBadge>{year}</StatusBadge>}
          {status && <StatusBadge>{status}</StatusBadge>}
          {type && <StatusBadge>{type}</StatusBadge>}
        </div>
      </div>

      <div
        className="flex gap-2 justify-center items-center self-stretch px-4 py-3 my-auto text-sm font-semibold leading-6 text-green-600 whitespace-nowrap rounded-xl w-[95px] cursor-pointer hover:bg-green-50 transition-colors"
        onClick={onDetailClick}
      >
        <span className="self-stretch my-auto">Detail</span>
        <ChevronRight className="w-4 h-4 text-green-600" />
      </div>
    </div>
  );
}

export default LawCard;
