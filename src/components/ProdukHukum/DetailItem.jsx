import * as React from "react";

function DetailItem({ label, value }) {
  return (
    <div className="flex px-0 py-3 border-b border-solid border-b-zinc-100">
      <div className="text-base font-medium text-zinc-600 w-[250px]">
        {label}
      </div>
      <div className="flex-1 text-base text-zinc-600">{value}</div>
    </div>
  );
}

export default DetailItem;
