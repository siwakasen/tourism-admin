import { CreateUpdateTourForm } from "../../../components/forms/tourPackage/create-update.form";
export const tourPackageCreateRoute = "/admin/tour-package/create";
import { tourPackageRoute } from "../index";

export default function CreateTourPackage(): React.ReactElement {
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <CreateUpdateTourForm
          data={null}
          title={"Create New Tour Package"}
          route={tourPackageRoute}
        />
      </div>
    </div>
  );
}
