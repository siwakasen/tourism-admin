export const carsRentalRouteCreate = "/admin/cars-rental/create";
import CreateUpdateCarsForm from "../../../components/forms/carsRental/create-update.form";
import { carsRentalRoute } from "../index";
export default function CreateCarsRental(): React.ReactElement {
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <CreateUpdateCarsForm
          data={null}
          title={"Add New Car"}
          route={carsRentalRoute}
        />
      </div>
    </div>
  );
}
