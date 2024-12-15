import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage, { LoginRoute } from "../pages/auth/login.page";
import AdminLayouts from "../layouts/admin.layout";
import LoadingPages from "../components/loadings/loading-pages";
import TourPackagePage, { tourPackageRoute } from "../pages/package-tour";
import CarsRentalPage from "../pages/cars-rental";
import CreateTourPackage, {
  tourPackageCreateRoute,
} from "../pages/package-tour/create";
import ResetPasswordRequest, {
  ResetPasswordRouteRequest,
} from "../pages/auth/reset-password-request.page";
import ResetPassword, {
  ResetPasswordRoute,
} from "../pages/auth/reset-password.page";

import UpdateTourPackage, {
  tourPackageUpdateRoute,
} from "../pages/package-tour/update";
import { useAppSelector } from "../store";

const AppRoutes = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  console.log("isi token", accessToken);
  return (
    <Suspense fallback={<LoadingPages />}>
      <Routes>
        {/* Redirect jika rute tidak ditemukan */}
        <Route
          path="*"
          element={<Navigate to={accessToken ? "/admin" : "/login"} />}
        />
        {/* Rute login */}
        <Route
          path={LoginRoute}
          element={accessToken ? <Navigate to={"/admin"} /> : <LoginPage />}
        />
        <Route
          path={ResetPasswordRouteRequest}
          element={
            accessToken ? <Navigate to={"/admin"} /> : <ResetPasswordRequest />
          }
        />
        <Route
          path={ResetPasswordRoute}
          element={accessToken ? <Navigate to={"/admin"} /> : <ResetPassword />}
        />

        {/* Rute admin */}
        <Route path="/admin" element={<AdminLayouts />}>
          <Route path="/admin" element={<div>Home Utama</div>} />
          <Route index element={<div>Admin Dashboard</div>} />
          <Route path="users" element={<div>Manage Users</div>} />
          <Route path={tourPackageRoute} element={<TourPackagePage />} />
          <Route
            path={tourPackageCreateRoute}
            element={<CreateTourPackage />}
          />
          <Route
            path={tourPackageUpdateRoute}
            element={<UpdateTourPackage />}
          />
          <Route path="cars-rental" element={<CarsRentalPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
