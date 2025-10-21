'use client';

import useSWR from 'swr';
import type { NotebookRecord } from '@/types/data';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch notebooks');
  return (await res.json()) as NotebookRecord[];
};

export function useNotebooks() {
  const { data, error, isLoading, mutate } = useSWR<NotebookRecord[]>('/api/notebooks', fetcher, {
    revalidateOnFocus: false
  });
  return {
    notebooks: data ?? [],
    error,
    isLoading,
    refresh: mutate
  };
}
