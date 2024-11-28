import { Params, TourPackage } from "../../__interface/tourpackage.interface";
import { tourPackagesDummy } from "../../data/dummy/tour-package.dummy";
import { HeaderTourPackage } from "../../data/header-table/tour-package.header";
import TableLayout from "../../layouts/table/table.layout";

export default function TourPackagePage(): React.ReactElement {
  return (
    <>
      <TableLayout<TourPackage, Params>
        title="Tour Package"
        data={tourPackagesDummy}
        headerTable={HeaderTourPackage}
        handleCreate={() => {}} // Memanggil handler untuk membuat data baru
        setSelectedId={() => {}}
        loading={false}
      />
    </>
  );
}
