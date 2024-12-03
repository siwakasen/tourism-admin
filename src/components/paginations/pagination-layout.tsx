import React, { useState } from "react";
import Pagination from "./pagination";
import ItemsLimitDropdown from "./item-limit.dropdown";
import { PaginationInterface } from "../../__interface/table.interface";

const PaginatedComponent: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationInterface>({
    limit: 10,
    page: 1,
    total: 100, // Contoh total data
    totalPages: 10,
  });

  const handleItemsPerPageChange = (limit: number) => {
    setPagination((prev) => ({
      ...prev,
      limit,
      page: 1, // Reset ke halaman pertama
      totalPages: Math.ceil(prev.total / limit),
    }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="py-5 flex justify-between items-center">
      <ItemsLimitDropdown
        options={[5, 10, 15, 20]} // Pilihan jumlah item per halaman
        defaultValue={pagination.limit}
        onChange={handleItemsPerPageChange}
      />
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedComponent;
