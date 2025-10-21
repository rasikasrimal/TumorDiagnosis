'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
  useReactTable,
  getFilteredRowModel
} from '@tanstack/react-table';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { DatasetRow } from '@/types/data';

interface DataTableProps {
  data: DatasetRow[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<DatasetRow>[]>(() => {
    if (!data[0]) return [];
    return Object.keys(data[0]).map((key) => ({
      header: key,
      accessorKey: key
    }));
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <section className="space-y-4 rounded-xl border border-border bg-background/60 p-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">Table explorer</h3>
          <p className="text-sm text-muted-foreground">Sort, search, and filter your dataset without leaving the browser.</p>
        </div>
        <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-ring">
          <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
          <input
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search rows"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="cursor-pointer px-3 py-2"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' ↑',
                      desc: ' ↓'
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/60">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="whitespace-nowrap px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
