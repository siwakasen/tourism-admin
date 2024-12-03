import { SetStateAction, useEffect, useState } from "react";
import { Columns } from "../../components/table";
import SearchForm from "../../components/input/search-input";
import ActionButton from "../../components/button/action.button";
import { AiFillEdit } from "react-icons/ai";
import { TableV2 } from "../../components/table/table-v2";
interface PaginationDefaultI {
  page: number;
  limit: number;
}

interface props<T, P extends PaginationDefaultI> {
  title: string;
  params?: {
    value: P;
    setValue: React.Dispatch<React.SetStateAction<P>>;
  };
  headerTable: (
    handleDeletePopUp: (id?: string) => void,
    handleEdit: (id: string) => void
  ) => Columns<T>[];
  data: T[];
  handleCreate?: () => void;
  handleEdit?: (id: string) => void;
  setSelectedId: React.Dispatch<SetStateAction<string[]>>;
  modal?: React.ReactElement;
  remove?: {
    isOpen: boolean;
    handler: (id?: string) => void;
    handlerClose?: () => void;
  };
  loading?: boolean | false;
}

const TableLayout = <T, P extends PaginationDefaultI>({
  remove,
  //   params,
  handleCreate,
  setSelectedId,
  data,
  headerTable,
  modal,
  handleEdit,
  loading = true,
}: props<T, P>) => {
  //   const handlePageChange = async (page: number): Promise<void> => {
  //     params.setValue({ ...params.value, page });
  //   };
  const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
  useEffect(() => {
    setSelectedId(selectedColumn);
  }, [selectedColumn]);

  return (
    <div className="border-2 rounded-2xl shadow-lg m-4">
      {remove && (
        <div></div>
        // <DeletePopUp
        //   isOpen={remove.isOpen}
        //   data={title}
        //   onClose={() => remove.handlerClose!()}
        //   onEdit={() => remove.handler()}
        //   menu={title}
        // />
      )}
      <div className="grid grid-cols-1 gap-6 p-6  ">
        <div className="bg-slate-700 p-6 grid grid-cols-4 rounded-2xl">
          <div className="col-span-3">
            <h1 className="font-bold text-2xl text-white">
              Manage Your Package Tour
            </h1>
            <p className="text-sm text-white font-light">
              You can manage your package tour data here, such as creating new
              data, editing, and deleting
            </p>
          </div>
          <div className="col-span-1">LOGO</div>
        </div>
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <SearchForm
                placeholder="Search anything..."
                onSearch={() => {}}
              />
            </div>
            <div className="flex items-center justify-between gap-4 ml-4">
              <ActionButton
                text="Create"
                onClick={() => handleCreate!()}
                variant="primary"
                icon={<AiFillEdit />}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 ">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg  ">
                  <TableV2<T>
                    columns={headerTable(
                      remove?.handler ? remove.handler : () => {},
                      handleEdit!
                    )}
                    data={data}
                    isLoading={loading}
                    id={selectedColumn}
                    setIsChecked={setSelectedColumn}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal ? modal : null}
    </div>
  );
};

export default TableLayout;
