import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage, { LoginRoute } from "../pages/auth/login.page";
import AdminLayouts from "../layouts/admin.layout";
import LoadingPages from "../components/loadings/loading-pages";
import TourPackagePage, { tourPackageRoute } from "../pages/package-tour";
import CarsRentalPage, { carsRentalRoute } from "../pages/cars-rental";
import UpdateCarsRental, {
  carsRentalRouteUpdate,
} from "../pages/cars-rental/update";
import CreateCarsRental, {
  carsRentalRouteCreate,
} from "../pages/cars-rental/create";
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
  return (
    <Suspense fallback={<LoadingPages />}>
      <Routes>
        {/* Redirect jika rute tidak ditemukan */}
        <Route
          path="*"
          element={
            <Navigate to={accessToken ? "/admin/tour-package" : "/login"} />
          }
        />
        {/* Rute login */}
        <Route
          path={LoginRoute}
          element={
            accessToken ? (
              <Navigate to={"/admin/tour-package"} />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path={ResetPasswordRouteRequest}
          element={
            accessToken ? (
              <Navigate to={"/admin/tour-package"} />
            ) : (
              <ResetPasswordRequest />
            )
          }
        />
        <Route
          path={ResetPasswordRoute}
          element={
            accessToken ? (
              <Navigate to={"/admin/tour-package"} />
            ) : (
              <ResetPassword />
            )
          }
        />

        {/* Rute admin */}
        <Route path="/admin" element={<AdminLayouts />}>
          <Route
            path="/admin"
            element={
              accessToken ? (
                <Navigate to="/admin/tour-package" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path={tourPackageRoute} element={<TourPackagePage />} />
          <Route
            path={tourPackageCreateRoute}
            element={<CreateTourPackage />}
          />
          <Route
            path={tourPackageUpdateRoute}
            element={<UpdateTourPackage />}
          />
          <Route path={carsRentalRoute} element={<CarsRentalPage />} />
          <Route path={carsRentalRouteUpdate} element={<UpdateCarsRental />} />
          <Route path={carsRentalRouteCreate} element={<CreateCarsRental />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
