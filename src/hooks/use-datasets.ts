'use client';

import useSWR from 'swr';
import type { DatasetRecord } from '@/types/data';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch datasets');
  return (await res.json()) as DatasetRecord[];
};

export function useDatasets() {
  const { data, error, isLoading, mutate } = useSWR<DatasetRecord[]>('/api/datasets', fetcher, {
    revalidateOnFocus: false
  });
  return {
    datasets: data ?? [],
    error,
    isLoading,
    refresh: mutate
  };
}
