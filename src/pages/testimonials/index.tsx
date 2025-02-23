import { useNavigate, useOutletContext } from "react-router-dom";
import {
  ListTestimonialsReqI,
  Testimonial,
} from "../../__interface/testi.interface";
import { HeaderTestimonials } from "../../data/header-table/testimonials.header";
import TableLayout from "../../layouts/table/table.layout";
import { useListTestimonialsQuery } from "../../_service/testimonials";
import Modal from "../../components/modal/modal";
import { useState } from "react";
import { useDeleteTestimonialForm } from "../../_hooks/testimonials";
export const testimonialsRoute = "/admin/testimonials";
interface OutletContext {
  setShowSidebar: (show: boolean) => void;
  showSidebar: boolean;
}
export default function TestimonialsPage(): React.ReactElement {
  const { setShowSidebar, showSidebar } = useOutletContext<OutletContext>();
  const [paginationParams, setPaginationParams] =
    useState<ListTestimonialsReqI>({
      limit: 10,
      page: 1,
      search: "",
    });

  const {
    data: testimonials,
    isLoading,
    refetch,
  } = useListTestimonialsQuery(paginationParams);
  const navigate = useNavigate();

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { onDelete } = useDeleteTestimonialForm(refetch);
  const handleDelete = (id: string) => {
    setIsDelete(true);
    setSelectedId(id);
  };
  const handleCreate = () => {
    navigate("/admin/testimonials/create");
  };
  const handleSearch = (query: string) => {
    setPaginationParams((prev: ListTestimonialsReqI) => ({
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
      <TableLayout<Testimonial, ListTestimonialsReqI>
        title="Testimonials"
        data={testimonials?.data ?? []}
        headerTable={HeaderTestimonials}
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
        title="Delete Testimonial"
        children={<>Are you sure to delete this testimonial?</>}
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
