import { Cars } from "../../__interface/cars.interface";
import ActionButtonTable from "../../components/button/action-table.button";
import { Columns } from "../../components/table";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../../components/toggle";

export const HeaderCars = (
  handleDeletePopUp?: (id: string) => void,
  handleUpdateStatusPopUp?: (id: string, newStatus: boolean) => void
): Columns<Cars>[] => {
  const navigate = useNavigate(); // Initialize the navigate function
  const menuOptions = () => [
    {
      label: "Edit",
      action: (id?: string) => navigate(`/admin/cars-rental/update/${id}`),
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
    // {
    //   fieldId: "checkbox",
    //   label: "Checkbox",
    // },
    {
      fieldId: "index",
      label: "No",
    },
    {
      fieldId: "brand_name",
      label: "Brand Name",
      render: (data) => (
        <p className="font-semibold">{data?.brand.brand_name ?? ""}</p>
      ),
    },
    {
      fieldId: "car_name",
      label: "Car Name",
      render: (data) => <p className="font-semibold">{data?.car_name ?? ""}</p>,
    },
    {
      fieldId: "description",
      label: "Description",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.description ?? ""}</p>
      ),
    },
    {
      fieldId: "min_person",
      label: "Min Person",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.min_person ?? ""}</p>
      ),
    },
    {
      fieldId: "max_person",
      label: "Max Person",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.max_person ?? ""}</p>
      ),
    },
    {
      fieldId: "price",
      label: "Price",
      render: (data) => (
        <p className="text-sm text-gray-600 ">{data?.price ?? ""}</p>
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
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <ToggleSwitch
          isChecked={data?.status ?? false}
          onChange={(e) => {
            if (handleUpdateStatusPopUp) {
              handleUpdateStatusPopUp!(data?.id ?? "", e);
            }
          }}
          id={data?.id ?? ""}
          label={data?.status ? "Active" : "Inactive"}
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
