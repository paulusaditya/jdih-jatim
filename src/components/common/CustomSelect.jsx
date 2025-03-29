import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-blue-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-zinc-600">{value || name}</span>
        <span className="text-zinc-600">▼</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-blue-50 border text-blue-800 border-blue-300 rounded-lg mt-1">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-blue-100 hover:rounded-lg cursor-pointer hover:font-semibold"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
