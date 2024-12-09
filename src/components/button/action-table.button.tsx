import React, { useState, useEffect, useRef, ReactNode } from "react";
import { FaEllipsisV } from "react-icons/fa";

interface MenuOption {
  label: string;
  action: (id?: string) => void;
  icon?: ReactNode; // Ikon opsional untuk setiap item menu
}

interface ActionButtonTableProps {
  menuOptions: MenuOption[]; // Array menu dinamis
  id?: string;
}

const ActionButtonTable: React.FC<ActionButtonTableProps> = ({
  menuOptions,
  id,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Button */}
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FaEllipsisV />
      </button>

      {/* Menu */}
      {menuVisible && (
        <div className="absolute top-[-60px] right-[0px] mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg">
          <ul className="py-2">
            {menuOptions.map((option, index) => (
              <li key={index}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    option.action(id);
                    closeMenu(); // Tutup menu setelah klik
                  }}
                >
                  {/* Ikon (Jika Ada) */}
                  {option.icon && (
                    <span className="text-gray-600">{option.icon}</span>
                  )}
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionButtonTable;
