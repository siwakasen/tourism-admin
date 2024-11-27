import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../helper/routes/protected-route";

interface AdminLayoutsProps {
  children?: React.ReactNode; // Definisikan tipe children
}

const AdminLayouts: React.FC<AdminLayoutsProps> = ({ children }) => {
  return (
    <ProtectedRoutes>
      <div className="admin-layout">
        {/* Tambahkan Header, Sidebar, atau lainnya */}
        <main>
          {children || <Outlet />}{" "}
          {/* Gunakan Outlet jika children tidak ada */}
        </main>
      </div>
    </ProtectedRoutes>
  );
};

export default AdminLayouts;
