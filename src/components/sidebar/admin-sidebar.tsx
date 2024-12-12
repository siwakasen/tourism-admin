import { FaCar } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { PiIslandBold } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import logo_tour2 from "../../images/logo_tour2.png";

interface AdminSidebarProps {
  width?: string;
  showSidebar?: boolean;
  setShowSidebar?: (value: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = () => {
  const location = useLocation();
  const isActiveRoute = (route: string) => location.pathname === route;

  return (
    <div className="flex h-screen flex-col justify-between bg-gray-100 text-gray-800 ">
      {/* Logo */}
      <div className="px-4 py-6">
        <div className="flex justify-center mb-6">
          <span className="max-h-32 max-w-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-xl shadow">
            <img
              alt=""
              src={logo_tour2}
              className="  object-cover opacity-100 rounded-full"
            />
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="mt-6 space-y-2">
          <li>
            <Link
              to="/admin"
              className={`flex items-center gap-x-3.5 py-2 px-3 text-sm font-medium rounded-lg ${
                isActiveRoute("/admin")
                  ? "bg-gray-100 text-gray-800 shadow"
                  : "hover:bg-gray-100 hover:text-gray-900 transition"
              }`}
            >
              <MdDashboard className="size-5 text-gray-700" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/tour-package"
              className={`flex items-center gap-x-3.5 py-2 px-3 text-sm font-medium rounded-lg ${
                isActiveRoute("/admin/tour-package")
                  ? "bg-gray-100 text-gray-800 shadow"
                  : "hover:bg-gray-100 hover:text-gray-900 transition"
              }`}
            >
              <PiIslandBold className="size-5 text-gray-700" />
              Tour Package
            </Link>
          </li>

          <li>
            <Link
              to="/admin/cars-rental"
              className={`flex items-center gap-x-3.5 py-2 px-3 text-sm font-medium rounded-lg ${
                isActiveRoute("/admin/cars-rental")
                  ? "bg-gray-100 text-gray-800 shadow"
                  : "hover:bg-gray-100 hover:text-gray-900 transition"
              }`}
            >
              <FaCar className="size-5 text-gray-700" />
              Cars Rental
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mb-6 px-6">
        <button className="w-full rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition py-2 px-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
