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
  isDisabled = false, 
  restrictedMessage = null, 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleSelect = (optionValue) => {
    if (isDisabled) return; 
    if (optionValue.isDisabled) return;
    
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
    if (isDisabled) return; 
    
    e.stopPropagation();
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
    if (isDisabled) return; 
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (isDisabled) return; 
    
    onChange({
      target: {
        name,
        value: inputValue,
        isMultiple,
      },
    });
  };

  const handleDropdownClick = () => {
    if (isDisabled) return;
    setIsOpen(!isOpen);
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
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={isDisabled}
            className={`px-4 py-3 w-full bg-white rounded-lg border border-green-300 text-zinc-600 pr-10 ${
              isDisabled 
                ? "bg-gray-100 cursor-not-allowed text-gray-400" 
                : ""
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
        {isDisabled && restrictedMessage && (
          <div className="text-xs text-gray-500 mt-1">{restrictedMessage}</div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex items-center justify-between px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-green-300 ${
          isDisabled 
            ? "cursor-not-allowed bg-gray-100" 
            : "cursor-pointer hover:border-green-400"
        }`}
        onClick={handleDropdownClick}
      >
        <span className={`text-zinc-600 ${!value && "text-gray-400"} ${isDisabled && "text-gray-400"} flex-grow`}>
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
            <ChevronDown 
              className={`text-zinc-600 ${isDisabled && "text-gray-400"}`} 
              size={16} 
            />
          )}
        </div>
      </div>
      
      {isDisabled && restrictedMessage && (
        <div className="text-xs text-gray-500 mt-1">{restrictedMessage}</div>
      )}
      
      {isOpen && !isDisabled && (
        <div className="absolute z-10 w-full bg-green-50 border text-green-800 border-green-300 rounded-lg mt-1 max-h-48 overflow-y-auto custom-scrollbar">
          {options && options.length > 0 ? (
            options.map((option, index) => {
              const isOptionDisabled = option.isDisabled || false;
              return (
                <div
                  key={index}
                  className={`px-4 py-3 ${
                    isOptionDisabled 
                      ? "text-gray-400 cursor-not-allowed bg-gray-50" 
                      : "hover:bg-green-100 hover:rounded-lg cursor-pointer hover:font-semibold"
                  }`}
                  onClick={() => !isOptionDisabled && handleSelect(option)}
                  title={isOptionDisabled ? "Tidak tersedia untuk halaman ini" : ""}
                >
                  {option.label || option}
                  {isOptionDisabled && null}
                </div>
              );
            })
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