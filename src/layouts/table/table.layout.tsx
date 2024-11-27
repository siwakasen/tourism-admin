import { SetStateAction, useEffect, useState } from "react";
import { Columns, Table } from "../../components/table";
interface PaginationDefaultI {
  page: number;
  limit: number;
}

interface props<T, P extends PaginationDefaultI> {
  title: string;
  params: {
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
  title,
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
    <div>
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
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4"></div>
            <div className="flex items-center justify-between gap-4 ml-4">
              <button
                onClick={handleCreate}
                className="bg-blue-ribbon text-white hover:bg-blue-ribbon/90 rounded-xl font-medium"
              >
                Create {title}
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden shadow-2xl rounded-s-lg bg-white border border-[#E9ECFF]">
                  <Table<T>
                    columns={headerTable(
                      remove?.handler ? remove.handler : () => {},
                      handleEdit!
                    )}
                    data={data}
                    loading={loading}
                    id={selectedColumn}
                    setIsChecked={setSelectedColumn}
                  />
                  <div className="flex flex-col">
                    {/* <Pagination
                      currentPage={params.value.page}
                      totalPages={params.value.limit}
                      onPageChange={handlePageChange}
                    /> */}
                  </div>
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
