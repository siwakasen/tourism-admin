import { useNavigate } from "react-router-dom";
import { Params, TourPackage } from "../../__interface/tourpackage.interface";
import { HeaderTourPackage } from "../../data/header-table/tour-package.header";
import TableLayout from "../../layouts/table/table.layout";
import useFetchTourPackages from "../../hooks/package-tour";

export const tourPackageRoute = "/admin/tour-package";
export default function TourPackagePage(): React.ReactElement {
  const navigate = useNavigate(); // Initialize the navigate function
  const { tourPackages, loading } = useFetchTourPackages();

  const handleCreate = () => {
    navigate("/admin/tour-package/create");
  };

  return (
    <>
      <TableLayout<TourPackage, Params>
        title="Tour Package"
        data={tourPackages}
        headerTable={HeaderTourPackage}
        handleCreate={handleCreate} // Pass the handler to TableLayout
        setSelectedId={() => {}}
        loading={loading}
      />
    </>
  );
}
