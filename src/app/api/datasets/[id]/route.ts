import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDataset } from '@/stores/data-store';

interface Params {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const dataset = getDataset(params.id);
  if (!dataset) {
    return NextResponse.json({ error: 'Dataset not found.' }, { status: 404 });
  }
  return NextResponse.json(dataset);
}
