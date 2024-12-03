import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../_helper/routes/protected-route";
import AdminSidebar from "../components/sidebar/admin-sidebar";
import Footer from "../components/layout/footer";

interface AdminLayoutsProps {
  children?: React.ReactNode; // Definisikan tipe children
}

const AdminLayouts: React.FC<AdminLayoutsProps> = ({ children }) => {
  return (
    <ProtectedRoutes>
      <div className="admin-layout bg-gray-100 ">
        {/* tambahkan header */}
        <main>
          <div className="flex ">
            <div className="w-[16vw]">
              <AdminSidebar />
            </div>
            <div className=" w-[84vw]">{children || <Outlet />} </div>
          </div>
        </main>
      </div>
    </ProtectedRoutes>
  );
};

export default AdminLayouts;
