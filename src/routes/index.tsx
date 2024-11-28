import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login.page";
import AdminLayouts from "../layouts/admin.layout";
import LoadingPages from "../components/loadings/loading-pages";
import TourPackagePage from "../pages/package-tour";

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPages />}>
      <Routes>
        {/* Redirect jika rute tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* Rute utama */}
        <Route path="/" element={<div>Home Utama</div>} />

        {/* Rute login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rute admin */}
        <Route path="/admin" element={<AdminLayouts />}>
          <Route index element={<div>Admin Dashboard</div>} />
          <Route path="users" element={<div>Manage Users</div>} />
          <Route path="tour-package" element={<TourPackagePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
