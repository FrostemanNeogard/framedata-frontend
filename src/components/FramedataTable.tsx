import { useState, useEffect } from "react";
import { Framedata } from "../__types/apiResponse";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useScreenType from "../hooks/useScreenType";

type FramedataTableProps = {
  game: string;
  character: string;
};
export default function FramedataTable({
  game,
  character,
}: FramedataTableProps) {
  const [framedata, setFramedata] = useState<Framedata[]>([]);

  const { isMobile } = useScreenType();

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

  const baseColumns = {
    input: columnHelper.accessor("input", {
      header: "Input",
      cell: (info) => info.getValue(),
    }),
    hitLevel: columnHelper.accessor("hit_level", {
      header: "Hit Level",
      cell: (info) => info.getValue(),
      minSize: 10,
      size: 20,
      maxSize: 25,
    }),
    damage: columnHelper.accessor("damage", {
      header: "Damage",
      cell: (info) => info.getValue(),
    }),
    startup: columnHelper.accessor("startup", {
      header: "Startup",
      cell: (info) => info.getValue(),
    }),
    hit: columnHelper.accessor("hit", {
      header: "Hit",
      cell: (info) => info.getValue(),
    }),
    block: columnHelper.accessor("block", {
      header: "Block",
      cell: (info) => info.getValue(),
    }),
    counter: columnHelper.accessor("counter", {
      header: "Counter",
      cell: (info) => info.getValue(),
    }),
    notes: columnHelper.accessor("notes", {
      header: "Notes",
      cell: (info) => (
        <ul>
          {info.getValue().map((note, index) => (
            <li key={`framedata-note-${index}`}>
              {note.endsWith(".") ? note : `${note}.`}
            </li>
          ))}
        </ul>
      ),
    }),
  };

  const fullColumns = [
    baseColumns.input,
    baseColumns.hitLevel,
    baseColumns.damage,
    baseColumns.startup,
    baseColumns.hit,
    baseColumns.block,
    baseColumns.counter,
    baseColumns.notes,
  ];

  const simpleColumns = [
    baseColumns.input,
    baseColumns.hitLevel,
    baseColumns.damage,
    baseColumns.startup,
    columnHelper.display({
      id: "hbc",
      header: "Hit/Block/Counter",
      cell: (info) => {
        const row = info.row.original;
        return `${row.hit ?? "-"} / ${row.block ?? "-"} / ${row.counter ?? "-"}`;
      },
      footer: () => "hbc",
    }),
  ];

  const table = useReactTable<Framedata>({
    data: framedata,
    columns: isMobile ? simpleColumns : fullColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="w-full [&_td]:py-2 [&_td]:border [&_td]:border-solid [&_td]:align-top [&_tr:nth-child(odd)]:bg-primary [&_tr:nth-child(even)_td]:border-primary [&_tr:nth-child(odd)_td]:border-secondary [&_tr:nth-child(even)]:bg-secondary">
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
      </table>
    </div>
  );
}
