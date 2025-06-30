import { useNavigate, useOutletContext } from "react-router-dom";
import TableLayout from "../../layouts/table/table.layout";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import { useListCarsQuery } from "../../_service/cars";

import { carsRentalRouteCreate } from "./create";
import { PaginationI } from "../../__interface/travel_package.interface";
import { useDeleteCarsForm } from "../../_hooks/cars";
import { Cars } from "../../__interface/cars.interface";
import { HeaderCars } from "../../data/header-table/cars.header";
interface OutletContext {
  setShowSidebar: (show: boolean) => void;
  showSidebar: boolean;
}

export const carsRentalRoute = "/admin/cars-rental";

export default function CarsRentalPage(): React.ReactElement {
  const navigate = useNavigate();

  const { setShowSidebar, showSidebar } = useOutletContext<OutletContext>();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCreate = () => {
    navigate(carsRentalRouteCreate);
  };
  const [paginationParams, setPaginationParams] = useState<PaginationI>({
    limit: 10,
    page: 1,
    search: "",
  });

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const handleSearch = (query: string) => {
    setPaginationParams((prev) => ({ ...prev, search: query }));
    refetch();
  };

  const handleDelete = (id: number) => {
    setIsDelete(true);
    setSelectedId(id);
  };

  const { data: cars, isLoading, refetch } = useListCarsQuery(paginationParams);

  const { onDelete } = useDeleteCarsForm(refetch);

  return (
    <>
      <TableLayout<Cars, PaginationI>
        title="Cars Rental"
        data={cars?.data ?? []}
        headerTable={HeaderCars}
        handleCreate={handleCreate}
        setSelectedId={() => {}}
        loading={isLoading}
        handleDelete={handleDelete}
        handleSearch={handleSearch}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Modal
        title="Delete Cars Rental"
        children={<>Are you sure to delete this cars rental?</>}
        isOpen={isDelete}
        btnColor="bg-red-600"
        hoverColor="hover:bg-red-700"
        handleAccept={() => onDelete(selectedId!)}
        onClose={() => {
          setIsDelete(false);
        }}
      />
    </>
  );
}
