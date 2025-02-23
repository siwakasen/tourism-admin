import { useParams } from "react-router-dom";
import { useEffect } from "react";
export const driversUpdateRoute = "/admin/drivers/update/:id";
import { driversRoute } from "..";
import { DriversForm } from "../../../components/forms/drivers/drivers.form";
import { useGetDriversByIdQuery } from "../../../_service/drivers";
export default function UpdateDrivers(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetDriversByIdQuery({
    id: id ?? "",
  });
  useEffect(() => {}, [data, isLoading]);
  return !data ? (
    <></>
  ) : (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <DriversForm
          data={data.data}
          title={"Update New Drivers"}
          route={driversRoute}
        />
      </div>
    </div>
  );
}
