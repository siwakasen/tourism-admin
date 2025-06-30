import { TravelPackage } from "../../__interface/travel_package.interface";
import { Columns } from "../../components/table/table-v2";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ActionButtonTable from "../../components/button/action-table.button";

export const HeaderTourPackage = (
  handleDeletePopUp?: (id: number) => void
): Columns<TravelPackage>[] => {
  const navigate = useNavigate(); // Initialize the navigate function
  const menuOptions = () => [
    {
      label: "Edit",
      action: (id?: number) => navigate(`/admin/tour-package/update/${id}`),
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
      label: "ID",
      render: (data) => <p>{data?.id}</p>,
    },
    {
      fieldId: "package_name",
      label: "Package Name",
      render: (data) => (
        <p className="font-semibold">{data?.package_name ?? ""}</p>
      ),
    },
    {
      fieldId: "description",
      label: "Description",
      render: (data) => (
        <p className="text-sm text-gray-600 ">
          {data?.description
            ? data.description.split(" ").slice(0, 15).join(" ") +
              (data.description.split(" ").length > 15 ? "..." : "")
            : ""}
        </p>
      ),
    },
    // {
    //   fieldId: "images",
    //   label: "Images",
    //   render: (data) => (
    //     <div className="flex gap-2">
    //       {data?.images?.map((image, index) => (
    //         <img
    //           key={index}
    //           src={image}
    //           alt={`Image ${index + 1}`}
    //           className="w-16 h-16 object-cover rounded"
    //         />
    //       )) ?? "No Images"}
    //     </div>
    //   ),
    // },
    {
      fieldId: "package_price",
      label: "Package Price",
      render: (data) => (
        <p className="font-semibold">
          ${data?.package_price?.toFixed(2) ?? "N/A"}
        </p>
      ),
    },
    {
      fieldId: "duration",
      label: "Duration",
      render: (data) => (
        <p>
          {data?.duration
            ? data?.duration > 1
              ? `${data?.duration} hours`
              : `${data?.duration} hour`
            : "N/A"}
        </p>
      ),
    },
    {
      fieldId: "max_persons",
      label: "Max Persons",
      render: (data) => (
        <p>
          {data?.max_persons
            ? data?.max_persons > 1
              ? `${data.max_persons} persons`
              : `${data.max_persons} person`
            : "N/A"}
        </p>
      ),
    },
    // {
    //   fieldId: "itineraries",
    //   label: "Itineraries",
    //   render: (data) => (
    //     <ul className="list-disc list-inside">
    //       {data?.itineraries?.map((item, index) => (
    //         <li key={index}>{item}</li>
    //       )) ?? "No Itineraries"}
    //     </ul>
    //   ),
    // },
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
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <>
          <ActionButtonTable id={data?.id} menuOptions={menuOptions()} />
        </>
      ),
    },
  ];
};
