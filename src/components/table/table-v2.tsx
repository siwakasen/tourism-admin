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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  columns: Columns<T>[];
  isLoading?: boolean;
  error?: string;
  action?: boolean;
  id?: number[];
  setIsChecked?: Dispatch<SetStateAction<number[]>>;
}

export function TableV2<T>({
  data = [],
  columns = [],
  isLoading = false,
  id = [],
  setIsChecked,
}: Props<T>): React.ReactElement {
  isLoading = false;
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className=" min-w-full inline-block align-middle">
          <div className="bg-white rounded-2xl divide-y divide-gray-200 p-4">
            <div className="overflow-x-auto ">
              <table className="table rounded-xl">
                {/* head */}
                <thead className="">
                  <tr className=" font-bold bg-gray-100 ">
                    {columns.map((column, index) => (
                      <th key={index} className="">
                        {column.label === "checkbox" ? (
                          <div className="flex justify-center">
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
                          </div>
                        ) : (
                          <div
                            style={{ fontSize: 15, fontWeight: "bold" }}
                            className=""
                          >
                            {column.renderHeader
                              ? column.renderHeader()
                              : column.label}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          {columns.map((column, colIndex) => (
                            <td
                              key={column.fieldId + colIndex}
                              className="px-6 py-3"
                            >
                              <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                          ))}
                        </tr>
                      ))
                    : data.map((rowData, rowIndex) => (
                        <tr
                          className="hover:bg-gray-100 hover:shadow-sm"
                          key={rowIndex}
                        >
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className={`  ${
                                column.label === "Action" ? "px-7" : "px-5 "
                              } py-3 text-xs font-medium text-gray-500 ${
                                column.label === "checkbox" ? "w-[50px]" : ""
                              }`}
                            >
                              {column.fieldId === "index" && (
                                <p className="font-semibold">
                                </p>
                              )}
                              {column.fieldId === "checkbox" ? (
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-sm"
                                  id={`${rowData.id}-checkbox`}
                                  value={rowData.id}
                                  checked={id.includes(rowData.id)}
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (setIsChecked) {
                                      if (e.target.checked) {
                                        setIsChecked((prev) => [
                                          ...prev,
                                          Number(e.target.value),
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
                                <div
                                  style={{ fontSize: 14, fontWeight: "normal" }}
                                >
                                  {column.render(rowData)}
                                </div>
                              ) : (
                                rowData[column.fieldId]
                              )}
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
