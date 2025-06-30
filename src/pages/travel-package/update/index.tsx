import { useParams } from "react-router-dom";
import { CreateUpdateTourForm } from "../../../components/forms/tourPackage/create-update.form";
import { useGetTravelPackageByIdQuery } from "../../../_service/travel_package";
import { useEffect } from "react";
export const travelPackageUpdateRoute = "/admin/tour-package/update/:id";
export const travelPackageListRoute = "/admin/tour-package";

export default function UpdateTourPackage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, refetch } = useGetTravelPackageByIdQuery({
    id: Number(id ?? 0),
  });

  useEffect(() => {
  }, [data, isLoading]);

  return !data ? (
    <></>
  ) : (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <CreateUpdateTourForm
          refetch={refetch}
          data={data.data}
          title={"Update Travel Package"}
          route={travelPackageListRoute}
        />
      </div>
    </div>
  );
}
