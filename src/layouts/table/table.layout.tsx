import { SetStateAction, useEffect, useState } from "react";
import { Columns } from "../../components/table";
import SearchForm from "../../components/input/search-input";
import ActionButton from "../../components/button/action.button";
import { AiFillEdit } from "react-icons/ai";
import { TableV2 } from "../../components/table/table-v2";
import Pagination from "../../components/paginations/pagination";
import NavBar from "../../components/layout/navbar";
import logo_tour2 from "../../images/logo_tour2.png";

interface PaginationDefaultI {
  page: number;
  limit: number;
}

interface props<T, P extends PaginationDefaultI> {
  title: string;
  handleDelete(id?: number): void;
  params?: {
    value: P;
    setValue: React.Dispatch<React.SetStateAction<P>>;
  };

  headerTable: (
    handleDeletePopUp: (id?: number) => void
  ) => Columns<T>[];

  data: T[];
  handleCreate?: () => void;
  setSelectedId: React.Dispatch<SetStateAction<number[]>>;
  modal?: React.ReactElement;
  remove?: {
    isOpen: boolean;
    handler: (id?: number) => void;
    handlerClose?: () => void;
  };
  loading?: boolean | false;
  handleSearch?: (query: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const TableLayout = <T, P extends PaginationDefaultI>({
  remove,
  handleCreate,
  setSelectedId,
  data,
  handleDelete,
  headerTable,
  modal,
  handleSearch,
  loading = true,
  setShowSidebar,
  showSidebar,
  title,
}: props<T, P>) => {
  //   const handlePageChange = async (page: number): Promise<void> => {
  //     params.setValue({ ...params.value, page });
  //   };
  const [selectedColumn, setSelectedColumn] = useState<number[]>([]);
  useEffect(() => {
    setSelectedId(selectedColumn);
  }, [selectedColumn]);
  return (
    <div className="h-screen max-h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 h-[96%] bg-white flex-grow overflow-auto">
        <NavBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
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
            <div className="col-span-3 flex flex-col justify-center">
              <h1 className="font-bold text-2xl text-white">
                Manage Your {title}
              </h1>
              <p className="text-sm text-white font-light">
                You can manage your {title} data here, such as creating new
                data, editing, and deleting
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <img
                alt=""
                src={logo_tour2}
                className="h-12  object-cover opacity-100 rounded-full"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SearchForm
                  placeholder="Search anything..."
                  onSearch={(query) => handleSearch!(query)}
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
                      columns={headerTable(handleDelete)}
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
