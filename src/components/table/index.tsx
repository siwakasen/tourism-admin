import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

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

export function Table<T>({
  data = [],
  columns = [],
  isLoading = false,
  id = [""],
  setIsChecked,
}: Props<T>): React.ReactElement {
  isLoading = false;
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="bg-white border-2 rounded-2xl divide-y divide-gray-200">
            {/* Table Section */}
            <div className="overflow-hidden px-4">
              <table className="w-full">
                <thead className="flex w-full py-4 ">
                  <tr className={` w-full rounded-xl flex items-center `}>
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
                          className="animate-pulse flex w-full items-center py-4 px-2 "
                        >
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className={`px-6 py-3 flex ${
                                column.label !== "checkbox" &&
                                column.label !== "No" &&
                                column.label !== "Action" &&
                                "grow"
                              } ${column.label === "Action" && "mr-4"}
                              ${column.label === "No" && "w-[70px]"}`}
                            >
                              <div
                                className={`h-4 bg-gray-300 rounded w-full text-transparent`}
                              >
                                {column.label === "checkbox"
                                  ? "ha"
                                  : column.label}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))
                    : data.map((data, colIndex) => (
                        <tr
                          key={colIndex}
                          className={` w-full flex items-center py-2 border-b-2`}
                        >
                          {columns.map((column, rowIndex) => (
                            <td
                              key={rowIndex}
                              className={` px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal  ${
                                column.label !== "checkbox" &&
                                column.label !== "No" &&
                                column.label !== "Action" &&
                                "grow"
                              } ${column.label === "Action" && "mr-4"} ${
                                column.label === "No" && "w-[70px]"
                              }`}
                            >
                              {column.fieldId === "index" && (
                                <p className="font-semibold">
                                  {rowIndex + 1 + (rowIndex - 1) * 0}
                                </p>
                              )}
                              {column.fieldId === "checkbox" && (
                                <input
                                  id={data?.id + "checkbox"}
                                  value={data?.id}
                                  type="checkbox"
                                  checked={id.includes(data?.id)}
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
                                          id.filter((item) => item !== data.id)
                                        );
                                      }
                                    }
                                  }}
                                />
                              )}
                              <p className="font-semibold">
                                {column?.render === undefined &&
                                  data[column.fieldId]}
                              </p>
                              <p className="text-gray-500">
                                {column?.fieldId2 !== undefined &&
                                  data[column.fieldId2]}
                              </p>
                              {column?.render !== undefined &&
                                column.render(data)}
                              <span>
                                {column?.fieldId3 !== undefined &&
                                  data[column.fieldId3]}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
