import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="flex gap-4 items-center p-10 bg-blue-50 text-base text-blue-600">
      {paths.map((path, index) => (
        <div key={index} className="flex gap-3 items-center">
          {index === 0 && <Home size={16} className="text-blue-600" />}
          {index > 0 && <ChevronRight size={14} className="text-gray-800" />}

          <span
            className={`${
              index === paths.length - 1
                ? "text-black"
                : "text-blue-600 hover:text-blue-800 transition duration-200"
            }`}
          >
            {path.label}
          </span>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
