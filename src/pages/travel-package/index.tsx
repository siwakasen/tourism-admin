import { useNavigate, useOutletContext } from "react-router-dom";
import { PaginationI, TravelPackage } from "../../__interface/travel_package.interface";
import { HeaderTourPackage } from "../../data/header-table/tour-package.header";
import TableLayout from "../../layouts/table/table.layout";
import { useListTravelPackageQuery } from "../../_service/travel_package";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import {
  useDeleteTravelPackage,
} from "../../_hooks/travel_package";
interface OutletContext {
  setShowSidebar: (show: boolean) => void;
  showSidebar: boolean;
}

export const tourPackageRoute = "/admin/tour-package";
export default function TourPackagePage(): React.ReactElement {
  const { setShowSidebar, showSidebar } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const [paginationParams, setPaginationParams] = useState<PaginationI>({
    limit: 10,
    page: 1,
    search: "",
  });

  const {
    data: travelPackages,
    isLoading,
    refetch,
  } = useListTravelPackageQuery(paginationParams);

  const handleCreate = () => {
    navigate("/admin/tour-package/create");
  };
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { onDelete } = useDeleteTravelPackage(refetch);

  const handleSearch = (query: string) => {
    setPaginationParams((prev) => ({ ...prev, search: query }));
    refetch();
  };

  const handleDelete = (id: number) => {
    setIsDelete(true);
    setSelectedId(id);
  };


  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <>
      <TableLayout<TravelPackage, PaginationI>
        title="Travel Package"
        data={travelPackages?.data ?? []}
        headerTable={HeaderTourPackage}
        handleCreate={handleCreate}
        setSelectedId={() => {}}
        loading={isLoading}
        handleDelete={handleDelete}
        handleSearch={handleSearch}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <Modal
        title="Delete Tour Package"
        children={<>Are you sure to delete this tour package?</>}
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
