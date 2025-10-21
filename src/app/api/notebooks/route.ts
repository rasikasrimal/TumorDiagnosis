import { NextResponse } from 'next/server';
import { listNotebooks } from '@/stores/data-store';

export async function GET() {
  return NextResponse.json(listNotebooks());
}
