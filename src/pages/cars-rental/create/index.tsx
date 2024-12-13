export const carsRentalRouteCreate = "/admin/cars-rental/create";
import { carsRentalRoute } from "../index";
export default function CreateCarsRental(): React.ReactElement {
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <CreateUpdateTourForm
          data={null}
          title={"Create New Tour Package"}
          route={carsRentalRoute}
        />
      </div>
    </div>
  );
}
