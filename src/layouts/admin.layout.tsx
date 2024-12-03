import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../_helper/routes/protected-route";
import AdminSidebar from "../components/sidebar/admin-sidebar";

interface AdminLayoutsProps {
  children?: React.ReactNode; // Definisikan tipe children
}

const AdminLayouts: React.FC<AdminLayoutsProps> = ({ children }) => {
  return (
    <ProtectedRoutes>
      <div className="admin-layout bg-slate-200 min-h-[100vh] ">
        {/* tambahkan header */}
        <main>
          <div className="flex ">
            <div className="w-2/12">
              <AdminSidebar />
            </div>
            <div className="w-10/12">{children || <Outlet />} </div>
          </div>
        </main>
      </div>
    </ProtectedRoutes>
  );
};

export default AdminLayouts;
