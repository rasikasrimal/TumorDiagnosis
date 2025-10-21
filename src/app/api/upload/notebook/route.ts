import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseNotebookFile } from '@/lib/notebook';
import { saveNotebook } from '@/stores/data-store';
import type { NotebookRecord } from '@/types/data';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'A notebook file is required.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = buffer.toString('utf-8');

    const cells = parseNotebookFile(text);
    const notebook: NotebookRecord = {
      id: crypto.randomUUID(),
      name: file.name,
      uploadedAt: new Date().toISOString(),
      cells
    };

    saveNotebook(notebook);

    return NextResponse.json(notebook, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to process notebook.' }, { status: 500 });
  }
}
