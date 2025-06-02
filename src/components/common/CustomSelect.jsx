import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  name,
  placeholder,
  isMultiple = false,
  type = "select",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleSelect = (optionValue) => {
    const newValue = optionValue.value || optionValue;
    onChange({
      target: {
        name,
        value: newValue,
        isMultiple,
      },
    });

    if (!history.includes(newValue)) {
      setHistory((prev) => [...prev, newValue]);
    }

    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({
      target: {
        name,
        value: "",
        isMultiple,
      },
    });
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange({
      target: {
        name,
        value: e.target.value,
        isMultiple,
      },
    });
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
  }, []);

  const displayValue = value || placeholder;

  if (type === "text" || type === "number") {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <div className="flex items-center relative">
          <input
            type={type}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="px-4 py-3 w-full bg-white rounded-lg border border-green-300 text-zinc-600 pr-10"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {isOpen && history.length > 0 && (
          <div className="absolute z-10 w-full bg-green-50 border text-green-800 border-green-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
            {history
              .filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-green-100 hover:font-semibold"
                  onClick={() => {
                    handleSelect(item);
                    setIsOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex items-center justify-between px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-green-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`text-zinc-600 ${!value && "text-gray-400"} flex-grow`}
        >
          {displayValue}
        </span>
        <div className="flex items-center">
          {value ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear(e);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          ) : (
            <ChevronDown className="text-zinc-600" size={16} />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-green-50 border text-green-800 border-green-300 rounded-lg mt-1">
          {options && options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-green-100 hover:rounded-lg cursor-pointer hover:font-semibold"
                onClick={() => handleSelect(option)}
              >
                {option.label || option}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
