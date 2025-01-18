import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../_helper/routes/protected-route";
import AdminSidebar from "../components/sidebar/admin-sidebar";

const AdminLayouts: React.FC = () => {
  const [showSidebar, setShowSidebar] = React.useState(true);

  return (
    <ProtectedRoutes>
      <div className="admin-layout bg-gray-100">
        <main>
          <div className="flex transition-all ease-in-out duration-300">
            {/* Sidebar */}
            <div
              className={`${
                showSidebar ? "w-[16vw]" : "w-0"
              } overflow-hidden transition-all ease-in-out duration-300`}
            >
              <AdminSidebar />
            </div>

            {/* Main Content */}
            <div
              className={`${
                showSidebar ? "w-[84vw]" : "w-full"
              } transition-all ease-in-out duration-300`}
            >
              <Outlet context={{ showSidebar, setShowSidebar }} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoutes>
  );
};

export default AdminLayouts;
