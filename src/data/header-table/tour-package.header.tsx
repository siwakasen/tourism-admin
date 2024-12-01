import { TourPackage } from "../../__interface/tourpackage.interface";
import ActionButtonTable from "../../components/button/action-table.button";
import { Columns } from "../../components/table";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";

const menuOptions = [
  {
    label: "Edit",
    action: () => alert("View Edit clicked!"),
    icon: <RiEdit2Fill />,
  },
  {
    label: "Hide",
    action: () => alert("Hide clicked!"),
    icon: <BiSolidHide />,
  },
  {
    label: "Delete",
    action: () => alert("Delete clicked!"),
    icon: <MdDelete />,
  },
];

export const HeaderTourPackage =
  (): //   handleDeletePopUp: (id: string) => void,
  //   handleUpdate: (id: string) => void
  Columns<TourPackage>[] => {
    //   const navigate = useNavigate();
    return [
      {
        fieldId: "checkbox",
        label: "checkbox",
      },
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
        fieldId: "id",
        label: "Action",
        render: () => (
          <>
            <ActionButtonTable menuOptions={menuOptions} />
          </>
        ),
      },
    ];
  };
