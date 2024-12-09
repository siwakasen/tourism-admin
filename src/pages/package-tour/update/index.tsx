import { useParams } from "react-router-dom";
import { TourPackage } from "../../../__interface/tourpackage.interface";
import { CreateUpdateTourForm } from "../../../components/forms/tourPackage/create-update.form";
import { fetchTourPackageById } from "../../../hooks/package-tour";
import { useEffect, useState } from "react";
export const tourPackageUpdateRoute = "/admin/tour-package/update/:id";
export const tourPackageListRoute = "/admin/tour-package";

export default function UpdateTourPackage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<TourPackage | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      fetchTourPackageById(id)
        .then((fetchedData: TourPackage | null) => {
          console.log(fetchedData);
          if (fetchedData) {
            setData(fetchedData);
          } else {
            console.error("No data found for the given ID.");
          }
          setLoading(false);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          console.error("Failed to fetch tour package:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !data ? (
    <div>No data found</div>
  ) : (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <CreateUpdateTourForm
          data={data}
          title={"Update Tour Package"}
          route={tourPackageListRoute}
        />
      </div>
    </div>
  );
}
