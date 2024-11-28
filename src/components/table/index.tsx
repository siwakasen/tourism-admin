import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { isEmpty } from "lodash";

export interface Columns<T> {
  fieldId: string;
  fieldId2?: string;
  fieldId3?: string;
  label: string;
  render?: (data?: T) => React.ReactElement | string;
  renderHeader?: () => React.ReactElement | string;
}

interface Props<T> {
  data?: any[];
  columns: Columns<T>[];
  loading?: boolean;
  error?: string;
  action?: boolean;
  onRowClick?: (item: T) => void;
  id?: string[];
  setIsChecked?: Dispatch<SetStateAction<string[]>>;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Table<T>({
  data = [],
  columns = [],
  loading = false,
  error = "",
  action = false,
  onRowClick,
  id = [""],
  setIsChecked,
}: Props<T>): React.ReactElement {
  const handleRowClick = (item: T): void => {
    if (onRowClick !== undefined) {
      onRowClick(item);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200">
            {/* Search Section */}
            <div className="py-3 px-4">
              <div className="relative max-w-xs">
                <label className="sr-only">Search</label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search for items"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                  <svg
                    className="size-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
              </div>
            </div>
            {/* Table Section */}
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        {column.label === "checkbox" ? (
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              className="w-4 h-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (setIsChecked) {
                                  if (e.target.checked) {
                                    setIsChecked(data.map((el) => el.id));
                                  } else {
                                    setIsChecked([]);
                                  }
                                }
                              }}
                            />
                          </div>
                        ) : (
                          column.label
                        )}
                        {column.renderHeader && column.renderHeader()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading &&
                    Array.from({ length: 5 }).map((_, idx) => (
                      <tr key={idx}>
                        <td
                          colSpan={columns.length}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    ))}
                  {!loading &&
                    isEmpty(error) &&
                    !isEmpty(data) &&
                    data.map((item, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={classNames(
                          action ? "hover:bg-gray-100 cursor-pointer" : "",
                          id.includes(item?.id) ? "bg-gray-100" : ""
                        )}
                        onClick={() => handleRowClick(item)}
                      >
                        {columns.map((column, colIndex) => (
                          <td
                            key={colIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                          >
                            {column.fieldId === "checkbox" ? (
                              <div className="flex items-center h-5">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                                  checked={id.includes(item?.id)}
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (setIsChecked) {
                                      if (e.target.checked) {
                                        setIsChecked((prev) => [
                                          ...prev,
                                          item.id,
                                        ]);
                                      } else {
                                        setIsChecked(
                                          id.filter((el) => el !== item.id)
                                        );
                                      }
                                    }
                                  }}
                                />
                              </div>
                            ) : column.render ? (
                              column.render(item)
                            ) : (
                              item[column.fieldId]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  {!loading && isEmpty(data) && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No Data Here
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="py-1 px-4">
              <nav
                className="flex items-center space-x-1"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  className="p-2.5 min-w-[40px] flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full"
                  aria-label="Previous"
                >
                  «
                </button>
                <button
                  type="button"
                  className="min-w-[40px] flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full"
                  aria-current="page"
                >
                  1
                </button>
                <button
                  type="button"
                  className="min-w-[40px] flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full"
                >
                  2
                </button>
                <button
                  type="button"
                  className="min-w-[40px] flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full"
                >
                  3
                </button>
                <button
                  type="button"
                  className="p-2.5 min-w-[40px] flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full"
                  aria-label="Next"
                >
                  »
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
