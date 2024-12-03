import React from "react";

interface BadgeProps {
  /**
   * Tipe badge (default, primary, secondary, accent, atau custom).
   * Default adalah `default`.
   */
  type?: "default" | "primary" | "secondary" | "accent";

  /**
   * Teks yang akan ditampilkan di dalam badge.
   */
  children: React.ReactNode;

  /**
   * Warna kustom untuk badge. Menggunakan warna ini akan mengabaikan `type`.
   */
  customColor?: string;

  /**
   * Apakah badge memiliki outline.
   * Default adalah `true`.
   */
  outline?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  type = "default",
  children,
  customColor,
  outline = true,
}) => {
  // Kelas dasar badge
  const baseClass = "badge";
  const outlineClass = outline ? "badge-outline" : "";

  // Tentukan kelas berdasarkan tipe badge
  const typeClass = customColor
    ? "" // Jika customColor digunakan, abaikan typeClass
    : {
        default: "",
        primary: "badge-primary",
        secondary: "badge-secondary",
        accent: "badge-accent",
      }[type];

  // Jika ada customColor, tambahkan style inline
  const style = customColor
    ? { backgroundColor: customColor, color: "white" }
    : undefined;

  return (
    <div className={`${baseClass} ${typeClass} ${outlineClass}`} style={style}>
      {children}
    </div>
  );
};

export default Badge;
