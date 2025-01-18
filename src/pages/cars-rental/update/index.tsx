import { useParams } from "react-router-dom";
import { CreateUpdateCarsForm } from "../../../components/forms/carsRental/create-update.form";
import { useGetCarsByIdQuery } from "../../../_service/cars";
import { useEffect } from "react";
import { carsRentalRoute } from "../index";
export const carsRentalRouteUpdate = "/admin/cars-rental/update/:id";
export default function UpdateCarsRental(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useGetCarsByIdQuery({
    id: id ?? "",
  });

  useEffect(() => {}, [data, isLoading]);
  return !data ? (
    <></>
  ) : (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <CreateUpdateCarsForm
          refetch={refetch}
          data={data.data}
          title={"Update Cars Rental"}
          route={carsRentalRoute}
        />
      </div>
    </div>
  );
}
