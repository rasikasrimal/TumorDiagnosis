'use client';

import useSWR from 'swr';
import type { DatasetRecord } from '@/types/data';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch dataset');
  return (await res.json()) as DatasetRecord;
};

export function useDataset(id?: string) {
  const { data, error, isLoading, mutate } = useSWR<DatasetRecord>(id ? `/api/datasets/${id}` : null, fetcher, {
    revalidateOnFocus: false
  });
  return {
    dataset: data,
    error,
    isLoading,
    refresh: mutate
  };
}
