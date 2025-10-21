import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getNotebook } from '@/stores/data-store';

interface Params {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const notebook = getNotebook(params.id);
  if (!notebook) {
    return NextResponse.json({ error: 'Notebook not found.' }, { status: 404 });
  }
  return NextResponse.json(notebook);
}
