import React from "react";
import { Outlet, Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children?: React.ReactNode; // Definisikan tipe untuk children
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const user = true; // Sesuaikan dengan logika autentikasi yang sebenarnya

  // Jika user tidak terautentikasi, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render anak-anak komponen jika user terautentikasi
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoutes;
