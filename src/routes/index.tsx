import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login.page";
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

import UpdateTourPackage, {
  tourPackageUpdateRoute,
} from "../pages/package-tour/update";

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
