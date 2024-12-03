import { FaCar } from "react-icons/fa";
import { PiIslandFill } from "react-icons/pi";
import { useLocation, Link } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const isActiveRoute = (route: string) => location.pathname === route;

  return (
    <>
      {/* <!-- Navigation Toggle --> */}
      <div className="py-16 text-center lg:hidden">
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-offcanvas-sidebar"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-offcanvas-sidebar"
        >
          Menu
        </button>
      </div>
      {/* <!-- End Navigation Toggle --> */}

      {/* <!-- Sidebar --> */}
      <div
        id="hs-offcanvas-sidebar"
        className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="px-6">
          <a
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
            href="#"
            aria-label="Brand"
          >
            Brand
          </a>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <Link
                to="/admin"
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                  isActiveRoute("/admin")
                    ? "bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                }`}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/tour-package"
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                  isActiveRoute("/admin/tour-package")
                    ? "bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                }`}
              >
                <PiIslandFill />
                Tour Packages
              </Link>
            </li>
            <li>
              <Link
                to="/admin/cars-rental"
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                  isActiveRoute("/admin/cars-rental")
                    ? "bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                }`}
              >
                <FaCar />
                Cars Rental
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* <!-- End Sidebar --> */}
    </>
  );
};

export default AdminSidebar;
