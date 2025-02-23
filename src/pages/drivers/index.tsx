export const driversRoute = "/admin/drivers";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ListDriversReqI, Drivers } from "../../__interface/drivers.interface";
import { HeaderDrivers } from "../../data/header-table/drivers.header";
import TableLayout from "../../layouts/table/table.layout";
import { useListDriverssQuery } from "../../_service/drivers";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import { useDeleteDriverForm } from "../../_hooks/drivers";

interface OutletContext {
  setShowSidebar: (show: boolean) => void;
  showSidebar: boolean;
}
export default function DriversPage(): React.ReactElement {
  const { setShowSidebar, showSidebar } = useOutletContext<OutletContext>();
  const [paginationParams, setPaginationParams] = useState<ListDriversReqI>({
    limit: 10,
    page: 1,
    search: "",
  });

  const {
    data: testimonials,
    isLoading,
    refetch,
  } = useListDriverssQuery(paginationParams);
  const navigate = useNavigate();

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { onDelete } = useDeleteDriverForm(refetch);
  const handleDelete = (id: string) => {
    setIsDelete(true);
    setSelectedId(id);
  };
  const handleCreate = () => {
    navigate("/admin/drivers/create");
  };
  const handleSearch = (query: string) => {
    setPaginationParams((prev: ListDriversReqI) => ({
      ...prev,
      search: query,
    }));
    refetch();
  };

  const handleUpdateStatus = () => {
    alert("no function");
  };
  return (
    <>
      <TableLayout<Drivers, ListDriversReqI>
        title="Drivers"
        data={testimonials?.data ?? []}
        headerTable={HeaderDrivers}
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
        title="Delete Drivers"
        children={<>Are you sure to delete this driver?</>}
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
