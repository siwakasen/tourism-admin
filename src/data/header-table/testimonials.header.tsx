import { Testimonial } from "../../__interface/testi.interface";
import { Columns } from "../../components/table/table-v2";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ActionButtonTable from "../../components/button/action-table.button";
export const HeaderTestimonials = (
  handleDeletePopUp?: (id: string) => void
): Columns<Testimonial>[] => {
  const navigate = useNavigate();
  const menuOptions = () => [
    {
      label: "Edit",
      action: (id?: string) => navigate(`/admin/testimonials/update/${id}`),
      icon: <RiEdit2Fill />,
    },
    {
      label: "Delete",
      action: (id?: string) => {
        handleDeletePopUp!(id!);
      },
      icon: <MdDelete />,
    },
  ];

  return [
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "name",
      label: "Name",
      render: (data) => <p className="font-semibold">{data?.name ?? ""}</p>,
    },
    {
      fieldId: "image",
      label: "Image",
      render: (data) => (
        <img
          src={`${VITE_APP_REST_TESTI}/public/testimonials-images/${data?.image}`}
          alt={data?.name}
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
    },
    {
      fieldId: "message",
      label: "Message",
      render: (data) => (
        <p className="text-sm text-gray-600 ">
          {data?.message
            ? data.message.split(" ").slice(0, 15).join(" ") +
              (data.message.split(" ").length > 15 ? "..." : "")
            : ""}
        </p>
      ),
    },
    {
      fieldId: "country",
      label: "Country",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.country}</p>
      ),
    },
    {
      fieldId: "action",
      label: "Action",
      render: (data) => (
        <ActionButtonTable menuOptions={menuOptions()} id={data?.id} />
      ),
    },
  ];
};
