import * as React from "react";

function DetailItem({ label, value }) {
  return (
    <div className="flex px-0 py-3 border-b border-solid border-b-zinc-100 items-start">
      <div className="text-base font-medium text-zinc-600 w-[250px] shrink-0">
        {label}
      </div>
      <div className="text-base text-zinc-600 break-words whitespace-pre-wrap flex-1 overflow-hidden text-ellipsis">
        {value}
      </div>
    </div>
  );
}

export default DetailItem;
