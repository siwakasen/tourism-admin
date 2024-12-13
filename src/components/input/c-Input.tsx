import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
  return (
    <div className={`form-control mb-4 ${className}`}>
      <label className="label">
        <span className="label-text font-medium text-gray-700 text-sm">
          {label}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`input input-bordered w-full ${
          errors ? "input-error" : ""
        } focus:outline-none focus:input-primary transition duration-300`}
        {...register}
      />
      {errors && <span className="text-red-500 text-xs mt-1">{errors}</span>}
    </div>
  );
};

export default CInputText;
