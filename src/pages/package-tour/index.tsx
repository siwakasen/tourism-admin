import { useNavigate } from "react-router-dom";
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
export default function TourPackagePage(): React.ReactElement {
  const navigate = useNavigate(); // Initialize the navigate function
  const {
    data: tourPackages,
    isLoading,
    refetch,
  } = useListTourPackageQuery({
    limit: 10,
    page: 1,
    search: "",
  });

  const handleCreate = () => {
    navigate("/admin/tour-package/create");
  };
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const { onDelete } = useDeleteTourPackage(refetch);
  const { onUpdate } = useUpdateStatusTourPackage(refetch);

  const handleDelete = (id: string) => {
    setIsDelete(true);
    setSelectedId(id);
  };

  const handleUpdateStatus = (id: string, newStatus: boolean) => {
    console.log("id", id);
    setIsUpdate(true);
    setSelectedId(id!);
    setStatus(newStatus!);
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
      />
      <Modal
        title=""
        children={<>test</>}
        isOpen={isDelete}
        handleAccept={() => onDelete(selectedId!)}
        onClose={() => {
          setIsDelete(false);
        }}
      />
      <Modal
        title=""
        children={<>test</>}
        isOpen={isUpdate}
        handleAccept={() => onUpdate({ id: selectedId!, status: status })}
        onClose={() => {
          setIsUpdate(false);
        }}
      />
    </>
  );
}
