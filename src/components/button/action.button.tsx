import React from "react";

type ButtonProps = {
  text: string; // Text displayed on the button
  icon?: JSX.Element; // Icon to display on the button (optional)
  variant?: "primary" | "secondary"; // Button style variant
  onClick?: () => void; // Click handler function
  disabled?: boolean; // Disabled state
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  variant = "primary",
  onClick,
  disabled = false,
}) => {
  const baseClass =
    "py-3 px-4 inline-flex  items-center gap-x-2 text-sm font-medium rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const primaryClass =
    "border border-transparent bg-slate-600 text-white hover:bg-slate-700 focus:bg-slate-700";

  const secondaryClass =
    "border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50";

  const classes =
    variant === "primary"
      ? `${baseClass} ${primaryClass}`
      : `${baseClass} ${secondaryClass}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {icon && <span className=" shrink-0">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
