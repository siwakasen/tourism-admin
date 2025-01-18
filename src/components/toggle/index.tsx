import React from "react";

interface ToggleSwitchProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  label,
  isChecked,
  onChange = () => {},
}) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={`w-10 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-offset-2 ${
            isChecked ? "peer-focus:ring-green-500" : "peer-focus:ring-red-500"
          } ${
            isChecked
              ? "peer-checked:bg-green-500 border border-green-500"
              : "peer-checked:bg-red-500 border border-red-500"
          } transition-all duration-300 ease-in-out`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out transform ${
              isChecked ? "translate-x-4 bg-green-300" : "bg-red-400 "
            }`}
          ></span>
        </div>
      </label>
      <span className="ml-3 text-sm text-gray-700 dark:text-gray-500">
        {label}
      </span>
    </div>
  );
};

export default ToggleSwitch;
