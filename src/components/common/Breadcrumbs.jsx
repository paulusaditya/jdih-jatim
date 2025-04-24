import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="flex flex-wrap gap-2 md:gap-4 items-center px-4 md:px-16 py-4 md:py-10 bg-blue-50 text-sm md:text-base text-blue-600 w-full">
      {paths.map((path, index) => (
        <div key={index} className="flex gap-2 md:gap-3 items-center">
          {index === 0 && <Home size={16} className="text-blue-600" />}
          {index > 0 && <ChevronRight size={14} className="text-gray-800" />}

          {index === paths.length - 1 ? (
            <span className="text-black cursor-default">{path.label}</span>
          ) : (
            <Link
              to={path.path}
              className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
            >
              {path.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
