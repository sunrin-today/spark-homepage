import { SortState } from "@/hooks/useTableSort";
import { Column } from "@/types/table";
import { ArrowDown, ArrowUp, ArrowUpDown, RefreshCw } from "lucide-react";

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  skeletonRowCount?: number;
  sort?: SortState;
  onSortChange?: (key: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  tableHeader?: React.ReactNode;

  onRowClick?: (item: T) => void;
  selectedRow?: T;
};

export function Table<T>({
  columns,
  data,
  isLoading = false,
  skeletonRowCount = 3,
  sort,
  onSortChange,
  onRefresh,
  isRefreshing,
  tableHeader,
  onRowClick,
  selectedRow,
}: DataTableProps<T>) {
  const skeletonRows = Array.from({ length: skeletonRowCount });

  return (
    <div className="flex flex-col gap-3 leading-normal">
      <div className={`w-full flex items-center ${tableHeader ? "justify-between" : "justify-end"}`}>
        {tableHeader}

        {onRefresh && (
          <RefreshCw
            className="w-6 h-6 p-1 text-[#767676] cursor-pointer"
            onClick={() => {
              onRefresh?.();
            }}
            style={{
              opacity: isRefreshing ? 0.5 : 1,
              cursor: isRefreshing ? 'not-allowed' : 'pointer'
            }}
          />
        )}
      </div>
      <div className="w-full overflow-x-auto border border-[#D5D5D5] rounded-s-[5px] md:rounded-xl">

        <table className="hidden lg:table w-full border-collapse table-fixed">
          <colgroup>
            {columns.map((col, i) => (
              <col
                key={i}
                style={{ width: col.width ?? "auto" }}
              />
            ))}
          </colgroup>
          <thead className="bg-[#E5E5E5] ">
            <tr className="text-[#767676] border-b border-[#D0D0D0]">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`
                    px-4 py-3 text-left text-base font-medium whitespace-nowrap
                    ${col.isSortable ? "cursor-pointer select-none" : ""}
                  `}
                  onClick={() => {
                    if (!col.isSortable || !col.sortKey) return;
                    onSortChange?.(col.sortKey);
                  }}
                >
                  <div className="flex items-center gap-1">
                    {col.header}

                    {col.isSortable && (
                      sort?.key === col.sortKey && sort ? (sort.order === "ASC" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />) : <ArrowUpDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? skeletonRows.map((_, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-[#D0D0D0]"
                  >
                    {columns.map((_, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-4 py-3"
                      >
                        <div className="h-4 w-full rounded bg-[#D5D5D5] animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`border-b border-[#D0D0D0] ${selectedRow === row ? 'bg-[#C0C0C0]' : 'hover:bg-lightgray'}`}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-4 py-3 text-base truncate text-black relative"
                        onClick={(e) => {
                          if (col.header === "액션") {
                            e.stopPropagation();
                          }
                        }}
                      >
                        {col.render(row, rIdx)}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
        <table className="lg:hidden w-full">
          <tbody>
            {isLoading
              ? skeletonRows.map((_, rIdx) => (
                  <tr
                    key={rIdx}
                    className="w-full table border-b justify-between border-[#D0D0D0] bg-[#F9F9F9]"
                  >
                    {columns.map((_, cIdx) => (
                      <td key={cIdx} className="py-[11px] px-5">
                        <div className="h-4 w-full rounded bg-[#D5D5D5] animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((row, rIdx) => (
                  <tr key={rIdx} onClick={() => onRowClick?.(row)} className="w-full table border-b justify-between border-[#D0D0D0] bg-[#F9F9F9] hover:bg-[#EEEEEE]">
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} className="py-[11px] px-5">
                        {col.render(row, rIdx)}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}