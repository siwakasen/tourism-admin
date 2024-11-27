import { Params, TourPackage } from "../../__interface/tourpackage.interface";
import TableLayout from "../../layouts/table/table.layout";

export default function ClassPage(): React.ReactElement {
  return (
    <>
      <TableLayout<TourPackage, Params>
        title="Tour Package"
        data={listData?.data ?? []}
        params={{ value: searchParams, setValue: setSearchParams }}
        headerTable={HeaderTourPackage}
        handleCreate={handleCreateStart} // Memanggil handler untuk membuat data baru
        setSelectedId={setSelectedColumn}
        remove={{
          isOpen: isDeletePopupOpen,
          handlerClose: handleClosePopUp,
          handler: handleDeletePopUp,
        }}
        handleEdit={handleUpdateStart} // Memanggil handler untuk memulai update data
        loading={isFetchLoading}
        modal={
          <ClassModal
            handler={handleModalUpsert}
            isOpen={modalUpsert}
            type={type}
            id={selectedId}
          />
        }
      />
    </>
  );
}
