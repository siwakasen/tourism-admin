import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

interface Props {
  label: string; // Label untuk input
  placeholder?: string; // Placeholder opsional
  register: UseFormRegisterReturn; // Untuk react-hook-form
  errors?: string; // Pesan error jika ada
  type?: "text" | "email" | "password"; // Jenis input
  className?: string; // Tambahan className opsional
  disabled?: boolean; // Opsional untuk disable input
}

const CInputText: React.FC<Props> = ({
  label,
  placeholder,
  register,
  errors,
  type = "text",
  className = "",
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`form-control mb-4 ${className}`}>
      <label className="label">
        <span className="label-text font-medium text-gray-700 text-sm">
          {label}
        </span>
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`input input-bordered w-full ${
            errors ? "input-error" : ""
          } focus:outline-none focus:input-primary transition duration-300`}
          {...register}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <IoIosEyeOff /> : <FaEye />}
          </button>
        )}
      </div>
      {errors && <span className="text-red-500 text-xs mt-1">{errors}</span>}
    </div>
  );
};

export default CInputText;
