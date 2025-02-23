export const driversRouteCreate = "/admin/drivers/create";
import { DriversForm } from "../../../components/forms/drivers/drivers.form";
import { driversRoute } from "../index";
export default function CreateDrivers(): React.ReactElement {
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <DriversForm
          data={null}
          title={"Create New Driver"}
          route={driversRoute}
        />
      </div>
    </div>
  );
}
