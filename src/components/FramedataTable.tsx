import { useState, useEffect } from "react";
import { Framedata } from "../__types/apiResponse";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import useScreenType from "../hooks/useScreenType";
import HorizontalDivider from "./HorizontalDivider";
import Throbber from "./Throbber";
import FramedataEditMenu from "./FramedataNotes";

type FramedataTableProps = {
  game: string;
  character: string;
};
export default function FramedataTable({
  game,
  character,
}: FramedataTableProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [framedata, setFramedata] = useState<Framedata[]>([]);

  const { isMobile } = useScreenType();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}framedata/${game}/${character}`
      );

      const data = await response.json();
      if (response.status == 200) {
        setError(null);
        setFramedata(data);
      } else {
        setError(
          data?.message || "Something went wrong. Please try again later."
        );
      }

      setIsLoading(false);
    })();
  }, [game, character]);

  const columnHelper = createColumnHelper<Framedata>();

  const baseColumns = {
    input: columnHelper.accessor("input", {
      header: "Input",
      cell: (info) => info.getValue(),
    }),
    hitLevel: columnHelper.accessor("hit_level", {
      header: isMobile ? "Level" : "Hit Level",
      cell: (info) => info.getValue(),
    }),
    damage: columnHelper.accessor("damage", {
      header: isMobile ? "DMG" : "Damage",
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
        <ul className="mr-auto">
          {info.getValue().map((note, index) => (
            <li key={`framedata-note-${index}`}>
              {note.endsWith(".") ? note : `${note}`}
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

  const hbcHeaderClassnames = {
    hit: "bg-green-400/50",
    block: "bg-yellow-300/50",
    counter: "bg-blue-400/50",
  };

  const simpleColumns = [
    baseColumns.input,
    baseColumns.hitLevel,
    baseColumns.damage,
    baseColumns.startup,
    columnHelper.display({
      id: "hbc",
      header: () => (
        <p>
          <span className={`px-1 ${hbcHeaderClassnames.hit}`}>H</span>/
          <span className={`px-1 ${hbcHeaderClassnames.block}`}>B</span>/
          <span className={`px-1 ${hbcHeaderClassnames.counter}`}>C</span>
        </p>
      ),
      cell: (info) => {
        const row = info.row.original;
        return (
          <>
            <p className={hbcHeaderClassnames.hit}>{row.hit}</p>
            {(row.block || row.counter) && <HorizontalDivider />}
            <p className={hbcHeaderClassnames.block}>{row.block}</p>
            {row.counter && <HorizontalDivider />}
            <p className={hbcHeaderClassnames.counter}>{row.counter}</p>
          </>
        );
      },
      footer: () => "hbc",
    }),
  ];

  const table = useReactTable<Framedata>({
    data: framedata,
    columns: isMobile ? simpleColumns : fullColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Throbber />;
  }

  if (error) {
    return <p>ERROR: {error}</p>;
  }

  return (
    <div>
      <table
        className={`w-full ${!isMobile && "table-fixed"} overflow-x-scroll [&_td]:py-1 [&_td]:border-r [&_td]:border-solid [&_td]:align-top [&_tr:nth-child(odd)]:bg-primary [&_tr:nth-child(even)_td]:border-primary [&_tr:nth-child(odd)_td]:border-secondary [&_tr:nth-child(even)]:bg-secondary`}
      >
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
          {table.getRowModel().rows.map((row: Row<Framedata>) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`break-all relative ${cell.column.id == "notes" ? "flex !border-none" : ""}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {cell.column.id == "notes" && (
                    <FramedataEditMenu
                      framedata={row.original}
                      game={game}
                      character={character}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
