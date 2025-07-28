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
  disabled = false, // Prop baru untuk disable state
  icon = null, // Prop untuk icon
  style = {}, // Prop untuk custom style
  id, // Prop untuk id
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleSelect = (optionValue) => {
    if (disabled) return; // Prevent selection when disabled
    
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
    if (disabled) return; // Prevent clearing when disabled
    
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
    if (disabled) return; // Prevent input changes when disabled
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (disabled) return; // Prevent blur handling when disabled
    
    onChange({
      target: {
        name,
        value: inputValue,
        isMultiple,
      },
    });
  };

  const handleToggle = () => {
    if (disabled) return; // Prevent toggle when disabled
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

  // Get classes for disabled state - warna sama seperti normal tapi cursor berbeda
  const getInputClasses = () => {
    const baseClasses = "px-4 py-3 w-full bg-white rounded-lg border border-green-300 text-zinc-600";
    
    if (disabled) {
      return `${baseClasses} cursor-not-allowed`;
    }
    
    return baseClasses;
  };

  const getSelectClasses = () => {
    const baseClasses = "flex items-center justify-between px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-green-300";
    
    if (disabled) {
      return `${baseClasses} cursor-not-allowed`;
    }
    
    return `${baseClasses} cursor-pointer`;
  };

  if (type === "text" || type === "number") {
    return (
      <div className="relative w-full" ref={dropdownRef} style={style}>
        <div className="flex items-center relative">
          <input
            id={id}
            type={type}
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`${getInputClasses()} ${icon ? 'pr-10' : 'pr-10'}`}
            autoComplete="off"
            {...props}
          />
          {/* Icon atau Clear Button */}
          <div className="absolute right-3 flex items-center">
            {inputValue && !disabled ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            ) : icon ? (
              <div className="text-gray-400">
                {icon}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef} style={style}>
      <div
        className={getSelectClasses()}
        onClick={handleToggle}
      >
        <span className={`${!value && "text-gray-400"} flex-grow text-zinc-600`}>
          {displayValue}
        </span>
        <div className="flex items-center">
          {value && !disabled ? (
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
              className="text-zinc-600" 
              size={16}
              style={{
                transform: isOpen && !disabled ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            />
          )}
        </div>
      </div>
      
      {isOpen && !disabled && (
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