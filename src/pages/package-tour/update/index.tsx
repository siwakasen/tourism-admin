import { useParams } from "react-router-dom";
import { CreateUpdateTourForm } from "../../../components/forms/tourPackage/create-update.form";
import { useGetTourPackageByIdQuery } from "../../../_service/package-tour";
import { useEffect } from "react";
export const tourPackageUpdateRoute = "/admin/tour-package/update/:id";
export const tourPackageListRoute = "/admin/tour-package";

export default function UpdateTourPackage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, refetch } = useGetTourPackageByIdQuery({
    id: id ?? "",
  });

  useEffect(() => {
    refetch();
  }, [data, isLoading]);

  return !data ? (
    <></>
  ) : (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <CreateUpdateTourForm
          refetch={refetch}
          data={data.data}
          title={"Update Tour Package"}
          route={tourPackageListRoute}
        />
      </div>
    </div>
  );
}
