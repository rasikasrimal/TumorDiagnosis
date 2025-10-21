import { NextResponse } from "next/server";
import { getCancerData, getCancerColumns } from "@/lib/csv";

const parseList = (value?: string | null) =>
  value
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) ?? [];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const pageSize = Number(url.searchParams.get("pageSize") ?? "50");
  const diagnosis = url.searchParams.get("diagnosis") ?? "All";
  const columnParam = parseList(url.searchParams.get("columns"));

  const [rows, columns] = await Promise.all([getCancerData(), getCancerColumns()]);

  if (!rows.length) {
    return NextResponse.json({ data: [], total: 0, page: 1, pageSize }, { status: 200 });
  }

  const allowedColumns = columnParam.length ? columnParam.filter((column) => columns.includes(column)) : columns;

  const filtered = rows.filter((row) => {
    if (diagnosis === "M" || diagnosis === "Malignant") {
      return row.diagnosis === "M";
    }
    if (diagnosis === "B" || diagnosis === "Benign") {
      return row.diagnosis === "B";
    }
    return true;
  });

  const start = Math.max(0, (page - 1) * pageSize);
  const end = Math.min(filtered.length, start + pageSize);
  const slice = filtered.slice(start, end).map((row) => {
    const record: Record<string, string | number> = {
      id: row.id,
      diagnosis: row.diagnosis
    };
    allowedColumns.forEach((column) => {
      record[column] = row[column];
    });
    return record;
  });

  return NextResponse.json({
    data: slice,
    page,
    pageSize,
    total: filtered.length,
    columns: allowedColumns
  });
}
