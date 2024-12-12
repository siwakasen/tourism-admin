import { useNavigate, useOutletContext } from "react-router-dom";
import {
  PaginationI,
  TourPackage,
} from "../../__interface/tourpackage.interface";
import { HeaderTourPackage } from "../../data/header-table/tour-package.header";
import TableLayout from "../../layouts/table/table.layout";
import { useListTourPackageQuery } from "../../_service/package-tour";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import {
  useDeleteTourPackage,
  useUpdateStatusTourPackage,
} from "../../hooks/package-tour";
export const tourPackageRoute = "/admin/tour-package";
interface OutletContext {
  setShowSidebar: (show: boolean) => void;
  showSidebar: boolean;
}

export default function TourPackagePage(): React.ReactElement {
  const { setShowSidebar, showSidebar } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const [paginationParams, setPaginationParams] = useState({
    limit: 10,
    page: 1,
    search: "",
  });

  // Fetch data with current parameters
  const {
    data: tourPackages,
    isLoading,
    refetch,
  } = useListTourPackageQuery(paginationParams);

  const handleCreate = () => {
    navigate("/admin/tour-package/create");
  };
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { onDelete } = useDeleteTourPackage(refetch);
  const { onUpdate } = useUpdateStatusTourPackage(refetch);

  const handleSearch = (query: string) => {
    setPaginationParams((prev) => ({ ...prev, search: query }));
    refetch();
  };

  const handleDelete = (id: string) => {
    setIsDelete(true);
    setSelectedId(id);
  };

  const handleUpdateStatus = (id: string, newStatus: boolean) => {
    onUpdate({ id: id!, status: newStatus });
  };

  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <TableLayout<TourPackage, PaginationI>
        title="Tour Package"
        data={tourPackages?.data ?? []}
        headerTable={HeaderTourPackage}
        handleCreate={handleCreate}
        setSelectedId={() => {}}
        loading={isLoading}
        handleDelete={handleDelete}
        handleUpdateStatus={handleUpdateStatus}
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
