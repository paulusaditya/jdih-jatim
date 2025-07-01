import React, { useEffect, useState } from "react";
import baseUrl from "../../config/api"

const LinkTerkait = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/topics?webmaster_section_id=13`)
      .then((res) => res.json())
      .then((resData) => {
        const items = resData.data.data.map((item) => ({
          title: item.title,
          image: item.image,
          link: item.fields?.[0]?.details || "#",
        }));
        setLinks(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full px-6 md:px-20 py-10 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2 text-center max-w-xl">
        <h2 className="text-2xl font-bold text-green-800">Link Terkait</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-[180px] h-[54px] bg-gray-200 animate-pulse rounded"
              ></div>
            ))
          : links.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[180px] h-[54px] object-contain"
                />
              </a>
            ))}
      </div>
    </div>
  );
};

export default LinkTerkait;
