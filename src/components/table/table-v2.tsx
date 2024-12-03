import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import Pagination from "../paginations/pagination";

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
  isLoading?: boolean;
  error?: string;
  action?: boolean;
  onRowClick?: (item: T) => void;
  id?: string[];
  setIsChecked?: Dispatch<SetStateAction<string[]>>;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function TableV2<T>({
  data = [],
  columns = [],
  isLoading = false,
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
  isLoading = false;
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className=" min-w-full inline-block align-middle">
          <div className="bg-white  rounded-2xl divide-y divide-gray-200">
            {/* Table Section */}
            <div className="overflow-hidden px-4">
              <table className="w-full">
                <thead className="flex w-full py-4 ">
                  <tr
                    className={`bg-gray-200 w-full rounded-xl flex items-center `}
                  >
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        className={` px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-w-normal  ${
                          column.label !== "checkbox" &&
                          column.label !== "No" &&
                          column.label !== "Action" &&
                          "grow"
                        } ${column.label === "Action" && ""} ${
                          column.label === "No" && "w-[70px]"
                        }`}
                      >
                        {column.label === "checkbox" ? (
                          <input
                            type="checkbox"
                            className="max-w-4 h-4 cursor-pointer"
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
                        ) : (
                          <div>
                            {column.renderHeader
                              ? column.renderHeader()
                              : column.label}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="flex flex-col w-full">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <tr
                          key={index}
                          className="animate-pulse flex w-full items-center py-4 px-2"
                        >
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className={`px-6 py-3 ${
                                column.label === "checkbox"
                                  ? "w-[50px] flex-none"
                                  : column.label === "Action"
                                  ? "w-[200px] flex-none"
                                  : "flex-1 min-w-0"
                              }`}
                            >
                              <div className="h-4 bg-gray-300 rounded w-full text-transparent">
                                {column.label}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))
                    : data.map((rowData, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="w-full flex items-center py-2 border-b-2 hover:border-none hover:shadow-md hover:-inset-4 hover:rounded-xl"
                        >
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className={classNames(
                                "px-6 py-3 text-left text-xs font-medium text-gray-500",
                                column.label === "checkbox"
                                  ? "w-[50px] flex-none"
                                  : column.label === "Action"
                                  ? "w-[80px] flex-none"
                                  : "flex-1 min-w-0"
                              )}
                            >
                              {column.fieldId === "index" ? (
                                <p className="font-semibold">{rowIndex + 1}</p>
                              ) : column.fieldId === "checkbox" ? (
                                <input
                                  id={`${rowData.id}-checkbox`}
                                  value={rowData.id}
                                  type="checkbox"
                                  checked={id.includes(rowData.id)}
                                  className="max-w-4 h-4 cursor-pointer"
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (setIsChecked) {
                                      if (e.target.checked) {
                                        setIsChecked((prev) => [
                                          ...prev,
                                          e.target.value,
                                        ]);
                                      } else {
                                        setIsChecked(
                                          id.filter(
                                            (item) => item !== rowData.id
                                          )
                                        );
                                      }
                                    }
                                  }}
                                />
                              ) : column.render ? (
                                column.render(rowData)
                              ) : (
                                <p className="font-semibold">
                                  {rowData[column.fieldId]}
                                </p>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                </tbody>
              </table>
              <div className="py-5 flex justify-end">
                <Pagination
                  currentPage={1}
                  totalPages={2}
                  onPageChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
