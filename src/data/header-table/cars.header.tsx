import { Cars } from "../../__interface/cars.interface";
import ActionButtonTable from "../../components/button/action-table.button";
import { Columns } from "../../components/table";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const HeaderCars = (
  handleDeletePopUp?: (id: number) => void,
): Columns<Cars>[] => {
  const navigate = useNavigate(); // Initialize the navigate function
  const menuOptions = () => [
    {
      label: "Edit",
      action: (id?: number) => navigate(`/admin/cars-rental/update/${id}`),
      icon: <RiEdit2Fill />,
    },
    {
      label: "Delete",
      action: (id?: number) => {
        handleDeletePopUp!(id!);
      },
      icon: <MdDelete />,
    },
  ];

  return [
    // {
    //   fieldId: "checkbox",
    //   label: "Checkbox",
    // },
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "car_name",
      label: "Car Name",
      render: (data) => <p className="font-semibold">{data?.car_name ?? ""}</p>,
    },
    {
      fieldId: "car_color",
      label: "Car Color",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.car_color ?? ""}</p>
      ),
    },
    {
      fieldId: "police_number",
      label: "Police Number",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.police_number ?? ""}</p>
      ),
    },
    {
      fieldId: "transmission",
      label: "Transmission",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.transmission ?? ""}</p>
      ),
    },
    {
      fieldId: "description",
      label: "Description",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.description ?? ""}</p>
      ),
    },
    {
      fieldId: "price",
      label: "Price",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.price_per_day ?? ""}</p>
      ),
    },
    {
      fieldId: "includes",
      label: "Includes",
      render: (data) => (
        <ul className="list-disc list-inside">
          {data?.includes?.map((include, index) => (
            <li key={index}>{include}</li>
          )) ?? "No Includes"}
        </ul>
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
