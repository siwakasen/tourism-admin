import { useNavigate } from "react-router-dom";
import {
  PaginationI,
  TourPackage,
} from "../../__interface/tourpackage.interface";
import { HeaderTourPackage } from "../../data/header-table/tour-package.header";
import TableLayout from "../../layouts/table/table.layout";
import { useListTourPackageQuery } from "../../_service/package-tour";

export const tourPackageRoute = "/admin/tour-package";
export default function TourPackagePage(): React.ReactElement {
  const navigate = useNavigate(); // Initialize the navigate function
  const { data: tourPackages, isLoading } = useListTourPackageQuery({
    page: 1,
    limit: 10,
    search: "",
  }); // Fetch the data from the API
  // Fetch the data from the API

  console.log("tourPackages", tourPackages);
  console.log("loading", isLoading);

  const handleCreate = () => {
    navigate("/admin/tour-package/create");
  };

  return (
    <>
      <TableLayout<TourPackage, PaginationI>
        title="Tour Package"
        data={tourPackages?.data ?? []}
        headerTable={HeaderTourPackage}
        handleCreate={handleCreate} // Pass the handler to TableLayout
        setSelectedId={() => {}}
        loading={isLoading}
      />
    </>
  );
}
