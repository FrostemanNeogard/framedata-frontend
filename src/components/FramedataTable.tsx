import { useState, useEffect } from "react";
import { Framedata } from "../__types/apiResponse";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type FramedataTableProps = {
  game: string;
  character: string;
};
export default function FramedataTable({
  game,
  character,
}: FramedataTableProps) {
  const [framedata, setFramedata] = useState<Framedata[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}framedata/${game}/${character}`
      );

      if (response.status == 200) {
        const data = await response.json();
        setFramedata(data);
      }
    })();
  }, [game, character]);

  const columnHelper = createColumnHelper<Framedata>();

  const columns = [
    columnHelper.accessor("input", {
      header: "Input",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("hit_level", {
      header: "Hit Level",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("damage", {
      header: "Damage",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("startup", {
      header: "Startup",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("hit", {
      header: "Hit",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("block", {
      header: "Block",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("counter", {
      header: "Counter",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("notes", {
      header: "Notes",
      cell: (info) => (
        <ul className="list-disc list-inside">
          {info.getValue().map((note) => (
            <li>{note}</li>
          ))}
        </ul>
      ),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable<Framedata>({
    data: framedata,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="w-full [&_td]:py-2 [&_td]:align-top [&_tr:nth-child(odd)]:bg-primary [&_tr:nth-child(even)]:bg-secondary">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
