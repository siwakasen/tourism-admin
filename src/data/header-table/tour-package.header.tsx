import { TourPackage } from "../../__interface/tourpackage.interface";
import { Columns } from "../../components/table";

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
        label: "",
        render: (data) => (
          <>
            <div>{data?.id}</div>
          </>
        ),
      },
    ];
  };
