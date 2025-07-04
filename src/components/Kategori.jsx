import * as React from "react";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import baseUrl from "../config/api";

function Kategori() {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/overview-by-id/10`)
      .then((res) => res.json())
      .then((data) => {
        setKategoriList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch kategori:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="px-5 pt-6 pb-3 rounded-lg border border-solid border-zinc-100">
        <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <div className="flex justify-between items-center py-2">
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
              </div>
              {/* Sub categories */}
              {Array.from({ length: 2 }).map((_, subIndex) => (
                <div
                  key={subIndex}
                  className="flex justify-between items-center py-2 ml-6"
                >
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-6 animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

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
