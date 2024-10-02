import { FC } from "react";

interface ITable<T> {
  from: number;
  columns: {
    label: string;
    name: keyof T;
    RenderCell?: FC<{ row: T }>;
  }[];
  rows: T[];
  RenderActionCell?: FC<{ row: T }>;
}

function Table<T>({ from, columns, rows, RenderActionCell }: ITable<T>) {
  return (
    <div className="overflow-y-auto scrollbar">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            {columns.map((column) => (
              <th key={column.label} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
            {RenderActionCell && (
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {from + index}
              </th>
              {columns.map((column) => {
                return (
                  <td key={column.label} className="px-6 py-4">
                    {column.RenderCell ? (
                      <column.RenderCell row={row} />
                    ) : (
                      (row[column.name] as string)
                    )}
                  </td>
                );
              })}
              {RenderActionCell && (
                <td className="px-6 py-4">
                  <div className="space-x-1 flex justify-center">
                    {<RenderActionCell row={row} />}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
