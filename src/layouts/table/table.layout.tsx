import { SetStateAction, useEffect, useState } from "react";
import { Columns } from "../../components/table";
import SearchForm from "../../components/input/search-input";
import ActionButton from "../../components/button/action.button";
import { AiFillEdit } from "react-icons/ai";
import { TableV2 } from "../../components/table/table-v2";
import Pagination from "../../components/paginations/pagination";
import NavBar from "../../components/layout/navbar";
interface PaginationDefaultI {
  page: number;
  limit: number;
}

interface props<T, P extends PaginationDefaultI> {
  title: string;
  handleDelete(id?: string): void;
  handleUpdateStatus(id?: string, newStatus?: boolean): void;
  params?: {
    value: P;
    setValue: React.Dispatch<React.SetStateAction<P>>;
  };
  headerTable: (
    handleDeletePopUp: (id?: string) => void,
    handleEdit: (id: string) => void,
    handleUpdateStatusPopUp: (id?: string, newStatus?: boolean) => void
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
  handleCreate,
  setSelectedId,
  data,
  handleDelete,
  handleUpdateStatus,
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
    <div className="h-screen max-h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 h-[96%] bg-white flex-grow overflow-auto">
        <NavBar />
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
          <div className="bg-secondary p-6 grid grid-cols-4 rounded-2xl">
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
                  <div className="overflow-auto rounded-xl  max-h-[calc(100vh-434px)]">
                    <TableV2<T>
                      columns={headerTable(
                        handleDelete,
                        handleEdit!,
                        handleUpdateStatus
                      )}
                      data={data}
                      isLoading={loading}
                      id={selectedColumn}
                      setIsChecked={setSelectedColumn}
                    />
                  </div>
                </div>
              </div>
              <div className="py-6 flex justify-end">
                <Pagination
                  currentPage={1}
                  totalPages={2}
                  onPageChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        {modal ? modal : null}
      </div>
    </div>
  );
};

export default TableLayout;
