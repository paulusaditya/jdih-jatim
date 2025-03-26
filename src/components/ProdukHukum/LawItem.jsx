const LawItem = ({ number, year, title, type }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{`Peraturan ${type} Nomor ${number} Tahun ${year}`}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Detail
      </button>
    </div>
  );
};

export default LawItem;
