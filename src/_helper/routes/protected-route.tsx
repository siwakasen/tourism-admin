import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

interface ProtectedRoutesProps {
  children?: React.ReactNode; // Definisikan tipe untuk children
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  console.log("isi token admin", accessToken);
  const user = accessToken ? true : false; // Sesuaikan dengan logika autentikasi yang sebenarnya

  // Jika user tidak terautentikasi, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render anak-anak komponen jika user terautentikasi
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoutes;
