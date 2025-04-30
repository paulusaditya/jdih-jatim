import * as React from "react";

function StatusBadge({ children }) {
  return (
    <div
      className="gap-2 self-stretch px-4 py-1 my-auto whitespace-nowrap text-sm"
      style={{
        backgroundColor: "rgba(0, 62, 156, 0.16)",
        color: "#003E9C",
        border: "1px solid #003E9C",
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

function LawCard({ number, title, year, status, type, onDetailClick }) {
  return (
    <div className="flex flex-wrap gap-10 items-center p-6 mt-5 w-full rounded-xl border border-blue-600 border-solid max-md:px-5">
      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-full sm:basis-1/2 md:basis-1/3 min-w-0 md:min-w-[240px] max-w-full">
        <div className="text-base font-bold leading-6 text-zinc-800">
          {title}
        </div>
        <div className="flex gap-2 flex-wrap items-center self-start mt-3 text-center">
          <StatusBadge>{number}</StatusBadge>
          <StatusBadge>{year}</StatusBadge>
          <StatusBadge>{status}</StatusBadge>
          <StatusBadge>{type}</StatusBadge>
        </div>
      </div>

      <div
        className="flex gap-2 justify-center items-center self-stretch px-4 py-3 my-auto text-sm font-semibold leading-6 text-blue-600 whitespace-nowrap rounded-xl w-[95px] cursor-pointer"
        onClick={onDetailClick}
      >
        <span className="self-stretch my-auto">Detail</span>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb048e6e7e6dba6c030e69058b3e1833431794882502b07a7cb8f857d11ee174?placeholderIfAbsent=true&apiKey=770a91bd70474eb39d8c1896cfba8984"
          alt="Arrow icon"
          className="object-contain w-4 aspect-square"
        />
      </div>
    </div>
  );
}

export default LawCard;
