import { Cars } from "../../__interface/cars.interface";
import ActionButtonTable from "../../components/button/action-table.button";
import { Columns } from "../../components/table";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const HeaderCars = (
  handleDeletePopUp?: (id: string) => void,
  handleUpdateStatusPopUp?: (id: string, newStatus: boolean) => void
): Columns<Cars>[] => {
  const navigate = useNavigate(); // Initialize the navigate function
  const menuOptions = (status: boolean) => [
    {
      label: "Edit",
      action: (id?: string) => navigate(`/admin/cars-rental/update/${id}`),
      icon: <RiEdit2Fill />,
    },
    {
      label: status ? "Hide" : "Show",
      action: (id?: string) => {
        if (handleUpdateStatusPopUp) {
          handleUpdateStatusPopUp!(id!, !status);
        } else {
          console.log(handleUpdateStatusPopUp);
        }
      },
      icon: <BiSolidHide />,
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
        <p className="text-sm text-gray-600 ">
          {data?.includes.join(", ") ?? ""}
        </p>
      ),
    },
    {
      fieldId: "status",
      label: "Status",
      render: (data) => (
        <p className="text-sm text-gray-600 ">
          {data?.status ? "Active" : "Inactive"}
        </p>
      ),
    },
    {
      fieldId: "action",
      label: "Action",
      render: (data) => (
        <ActionButtonTable
          menuOptions={menuOptions(data?.status ?? false)}
          id={data?.id}
        />
      ),
    },
  ];
};
