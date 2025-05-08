import * as React from "react";

function StatusBadge({ children }) {
  return (
    <div
      className="gap-2 self-stretch px-4 py-1 my-auto whitespace-nowrap"
      style={{
        backgroundColor: "rgba(0, 62, 156, 0.16)",
        color: "#003E9C",
        border: "1px solid #003E9C",
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
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start p-6 mt-5 w-full rounded-xl border border-blue-600 border-solid max-md:px-5 max-md:max-w-full">
      <img
        src={
          image ||
          "https://jdih.pisdev.my.id/uploads/default_document_image.png"
        }
        alt={title}
        className="w-[100px] h-[151px] rounded-lg object-cover md:mr-4"
      />
      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-8 min-w-[240px] max-md:max-w-full">
        <div className="text-base font-bold leading-6 text-zinc-800 max-md:max-w-full mb-16">
          {title}
        </div>
        <div className="flex flex-wrap gap-2 justify-start items-center self-start text-sm text-left text-blue-950">
          {status && <StatusBadge>{status}</StatusBadge>}
          {year && <StatusBadge>{year}</StatusBadge>}
          {category && <StatusBadge>{category}</StatusBadge>}
          {type && <StatusBadge>{type}</StatusBadge>}
          {number && <StatusBadge>{number}</StatusBadge>}
        </div>
      </div>
      <div
        className="flex gap-2 justify-center items-center self-stretch px-4 py-3 my-auto text-sm font-semibold leading-6 text-blue-600 whitespace-nowrap rounded-xl w-[95px] cursor-pointer"
        onClick={onDetailClick}
      >
        <div className="self-stretch my-auto">Detail</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb048e6e7e6dba6c030e69058b3e1833431794882502b07a7cb8f857d11ee174?placeholderIfAbsent=true&apiKey=770a91bd70474eb39d8c1896cfba8984"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
        />
      </div>
    </div>
  );
}

export default DocCard;
