import { FaCar } from "react-icons/fa";
import { PiIslandFill } from "react-icons/pi";
import { useLocation, Link } from "react-router-dom";

interface AdminSidebarProps {
  width?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = () => {
  const location = useLocation();
  const isActiveRoute = (route: string) => location.pathname === route;

  return (
    <div className="flex h-screen flex-col justify-between bg-gray-100 text-gray-800 ">
      {/* Logo */}
      <div className="px-4 py-6">
        <div className="flex justify-center mb-6">
          <span className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-xl shadow">
            LOGO
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
              <FaCar className="size-5 text-gray-700" />
              Dashboard
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition">
                <span className="text-sm font-medium"> Teams </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 pl-6">
                <li>
                  <Link
                    to="/admin/banned-users"
                    className="block py-2 px-3 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-900 transition"
                  >
                    Banned Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/calendar"
                    className="block py-2 px-3 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-900 transition"
                  >
                    Calendar
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <Link
              to="/admin/billing"
              className={`flex items-center gap-x-3.5 py-2 px-3 text-sm font-medium rounded-lg ${
                isActiveRoute("/admin/billing")
                  ? "bg-gray-100 text-gray-800 shadow"
                  : "hover:bg-gray-100 hover:text-gray-900 transition"
              }`}
            >
              <FaCar className="size-5 text-gray-700" />
              Billing
            </Link>
          </li>

          <li>
            <Link
              to="/admin/invoices"
              className={`flex items-center gap-x-3.5 py-2 px-3 text-sm font-medium rounded-lg ${
                isActiveRoute("/admin/invoices")
                  ? "bg-gray-100 text-gray-800 shadow"
                  : "hover:bg-gray-100 hover:text-gray-900 transition"
              }`}
            >
              <FaCar className="size-5 text-gray-700" />
              Invoices
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
