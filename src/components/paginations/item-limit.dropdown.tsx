import React, { useState } from "react";
import "./pagination.css";

interface ItemsLimitDropdownProps {
  options: number[];
  defaultValue: number;
  onChange: (value: number) => void;
}

const ItemsLimitDropdown: React.FC<ItemsLimitDropdownProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    setIsOpen(false); // Tutup dropdown setelah memilih
    onChange(value);
  };

  return (
    <div className="relative flex items-center gap-2">
      <span className="text-sm text-gray-600">Items per page</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="py-1 px-3 border border-gray-300 rounded-md bg-white text-gray-800 hover:bg-gray-50 focus:outline-none"
        >
          {selectedValue}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-2 w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <ul
            className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-full overflow-visible"
            style={{ top: "100%" }}
          >
            {options.map((option) => (
              <li
                key={option}
                className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItemsLimitDropdown;
