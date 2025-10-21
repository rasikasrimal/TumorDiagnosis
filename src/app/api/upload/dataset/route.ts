import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseCsv } from '@/lib/csv';
import { cleanDataset, detectNumericFields } from '@/lib/data-cleaning';
import { computeKpis } from '@/lib/kpis';
import { extractGeoPoints } from '@/lib/chart-data';
import { saveDataset } from '@/stores/data-store';
import type { DatasetRecord, DatasetRow } from '@/types/data';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'A dataset file is required.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = buffer.toString('utf-8');
    const extension = (file.name.split('.').pop() ?? '').toLowerCase();

    let rows: DatasetRow[];
    if (extension === 'csv') {
      rows = parseCsv(text);
    } else if (extension === 'json') {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        throw new Error('JSON datasets must contain an array of records.');
      }
      rows = parsed as DatasetRow[];
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Use CSV or JSON.' }, { status: 400 });
    }

    const cleaned = cleanDataset(rows);
    const numericFields = detectNumericFields(cleaned);
    const dataset: DatasetRecord = {
      id: crypto.randomUUID(),
      name: file.name,
      uploadedAt: new Date().toISOString(),
      fields: Object.keys(cleaned[0] ?? {}),
      rowCount: cleaned.length,
      sample: cleaned.slice(0, 20),
      data: cleaned,
      numericFields,
      kpis: computeKpis(cleaned),
      geoPoints: extractGeoPoints(cleaned)
    };

    saveDataset(dataset);

    return NextResponse.json(dataset, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to process dataset.' }, { status: 500 });
  }
}
