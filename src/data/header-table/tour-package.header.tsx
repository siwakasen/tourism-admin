import { TourPackage } from "../../__interface/tourpackage.interface";
import ActionButtonTable from "../../components/button/action-table.button";
import { Columns } from "../../components/table";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
export const HeaderTourPackage = (
  handleDeletePopUp?: (id: string) => void,
  handleUpdateStatusPopUp?: (id: string, newStatus: boolean) => void
): Columns<TourPackage>[] => {
  const navigate = useNavigate(); // Initialize the navigate function
  const menuOptions = (status: boolean) => [
    {
      label: "Edit",
      action: (id?: string) => navigate(`/admin/tour-package/update/${id}`),
      icon: <RiEdit2Fill />,
    },
    {
      label: status ? "Hide" : "Show",
      action: (id?: string) => {
        console.log(status);
        console.log(id);
        handleUpdateStatusPopUp!(id!, !status);
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
    {
      fieldId: "checkbox",
      label: "Checkbox",
    },
    {
      fieldId: "index",
      label: "No",
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
        <p className="text-sm text-gray-600">{data?.description ?? ""}</p>
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
      fieldId: "children_price",
      label: "Children Price",
      render: (data) => (
        <p className="font-semibold">
          ${data?.children_price?.toFixed(2) ?? "N/A"}
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
              ? `${data?.duration} days`
              : `${data?.duration} day`
            : "N/A"}
        </p>
      ),
    },
    {
      fieldId: "max_group_size",
      label: "Max Group Size",
      render: (data) => (
        <p>
          {data?.max_group_size
            ? data?.max_group_size > 1
              ? `${data.max_group_size} persons`
              : `${data.max_group_size} person`
            : "N/A"}
        </p>
      ),
    },
    {
      fieldId: "itineraries",
      label: "Itineraries",
      render: (data) => (
        <ul className="list-disc list-inside">
          {data?.itineraries?.map((item, index) => (
            <li key={index}>{item}</li>
          )) ?? "No Itineraries"}
        </ul>
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
      fieldId: "pickup_areas",
      label: "Pickup Areas",
      render: (data) => (
        <ul className="list-disc list-inside">
          {data?.pickup_areas?.map((pickup, index) => (
            <li key={index}>{pickup}</li>
          )) ?? "No Pickup Areas"}
        </ul>
      ),
    },
    {
      fieldId: "terms_conditions",
      label: "Terms & Conditions",
      render: (data) => (
        <ul className="list-disc list-inside">
          {data?.terms_conditions?.map((terms, index) => (
            <li key={index}>{terms}</li>
          )) ?? "No Terms & Conditions"}
        </ul>
      ),
    },

    {
      fieldId: "id",
      label: "Action",
      render: (data) => (
        <>
          <ActionButtonTable
            id={data?.id}
            menuOptions={menuOptions(data?.status ?? false)}
          />
        </>
      ),
    },
  ];
};
