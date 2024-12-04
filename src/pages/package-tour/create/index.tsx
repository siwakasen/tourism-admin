import { CreateUpdateTourForm } from "../../../components/forms/tourPackage/create-update.form";
export const tourPackageCreateRoute = "/admin/tour-package/create";
export const tourPackageListRoute = "/admin/tour-package";

export default function CreateTourPackage(): React.ReactElement {
  return (
    <div className=" max-h-screen h-screen overflow-hidden">
      <div className="border-2 rounded-2xl shadow-lg m-4 max-h-full h-[96%] overflow-auto  bg-white">
        <CreateUpdateTourForm
          data={null}
          title={"Create New Tour Package"}
          route={tourPackageListRoute}
        />
      </div>
    </div>
  );
}
