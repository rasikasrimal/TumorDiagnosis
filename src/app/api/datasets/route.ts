import { NextResponse } from 'next/server';
import { listDatasets } from '@/stores/data-store';

export async function GET() {
  const datasets = listDatasets();
  return NextResponse.json(datasets);
}
