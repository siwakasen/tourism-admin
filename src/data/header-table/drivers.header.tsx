import { Drivers } from "../../__interface/drivers.interface";
import { Columns } from "../../components/table/table-v2";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ActionButtonTable from "../../components/button/action-table.button";
export const HeaderDrivers = (
  handleDeletePopUp?: (id: string) => void
): Columns<Drivers>[] => {
  const navigate = useNavigate();
  const menuOptions = () => [
    {
      label: "Edit",
      action: (id?: string) => navigate(`/admin/drivers/update/${id}`),
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
          src={`${import.meta.env.VITE_APP_REST_DRIVERS}/public/drivers-images/${data?.photo_profile}`}
          alt={data?.name}
          className="w-20 h-20 object-cover rounded-full"
        />
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
