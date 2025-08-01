"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  name,
  placeholder,
  isMultiple = false,
  type = "select",
  regulationType = null, // Tambahan untuk handle regulation type
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");

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
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    // Jangan clear jika ini adalah field customField_19 dan ada regulationType
    if (name === 'customField_19' && regulationType) {
      return;
    }
    
    setInputValue("");
    onChange({
      target: {
        name,
        value: "",
        isMultiple,
      },
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    onChange({
      target: {
        name,
        value: inputValue,
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

  // Disable interaction jika ini adalah field customField_19 dan ada regulationType
  const isDisabled = name === 'customField_19' && regulationType;
  const displayValue = value || placeholder;

  if (type === "text" || type === "number") {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <div className="flex items-center relative">
          <input
            type={type}
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={isDisabled}
            className={`px-4 py-3 w-full bg-white rounded-lg border border-green-300 text-zinc-600 pr-10 ${
              isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            autoComplete="off"
          />
          {inputValue && !isDisabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex items-center justify-between px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-green-300 ${
          isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
      >
        <span className={`text-zinc-600 ${!value && "text-gray-400"} flex-grow`}>
          {displayValue}
        </span>
        <div className="flex items-center">
          {value && !isDisabled ? (
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
      {isOpen && !isDisabled && (
        <div className="absolute z-10 w-full bg-green-50 border text-green-800 border-green-300 rounded-lg mt-1 max-h-48 overflow-y-auto custom-scrollbar">
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #16a34a #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default CustomSelect;