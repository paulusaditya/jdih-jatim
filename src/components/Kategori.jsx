import * as React from "react";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import baseUrl from "../config/api";

function Kategori() {
  const [kategoriList, setKategoriList] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/overview-by-id/10`)
      .then((res) => res.json())
      .then((data) => setKategoriList(data))
      .catch((err) => console.error("Failed to fetch kategori:", err));
  }, []);

  return (
    <div className="px-5 pt-6 pb-3 rounded-lg border border-solid border-zinc-100">
      <div className="mb-3 text-xl font-bold text-green-600">Kategori</div>
      <div>
        {kategoriList.map((mainItem, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-between items-center py-2 mt-4">
              <div className="flex gap-2 items-center">
                <Bookmark className="w-5 h-5 text-green-600" />
                <div className="text-base font-bold text-zinc-800">
                  {mainItem.title_id}
                </div>
              </div>
              <div className="text-sm font-bold text-zinc-800">
                ({mainItem.jml})
              </div>
            </div>
            {mainItem.children?.map((child, idx) => (
              <div
                key={`${index}-${idx}`}
                className="flex justify-between items-center py-2 ml-6"
              >
                <div className="text-base text-zinc-700">{child.title_id}</div>
                <div className="text-sm text-zinc-600">({child.jml})</div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Kategori;
