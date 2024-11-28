import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../_helper/routes/protected-route";

interface AdminLayoutsProps {
  children?: React.ReactNode; // Definisikan tipe children
}

const AdminLayouts: React.FC<AdminLayoutsProps> = ({ children }) => {
  return (
    <ProtectedRoutes>
      <div className="admin-layout">
        {/* tambahkan header */}
        <main>
          <div className="grid grid-cols-12">
            <div className="col-span-2">{/* isi side bar nanti */}</div>
            <div className="col-span-10">{children || <Outlet />} </div>
          </div>
        </main>
      </div>
    </ProtectedRoutes>
  );
};

export default AdminLayouts;
