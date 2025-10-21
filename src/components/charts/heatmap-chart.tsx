'use client';

import dynamic from 'next/dynamic';
import type { HeatmapPoint } from '@/types/data';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface HeatmapChartProps {
  data: HeatmapPoint[];
  xCategories: string[];
  yCategories: string[];
  title: string;
  description?: string;
}

export function HeatmapChart({ data, xCategories, yCategories, title, description }: HeatmapChartProps) {
  const option = {
    tooltip: { position: 'top' },
    grid: { top: 24, right: 12, bottom: 24, left: 80 },
    xAxis: {
      type: 'category',
      data: xCategories,
      splitArea: { show: true }
    },
    yAxis: {
      type: 'category',
      data: yCategories,
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map((item) => item.value), 1),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0
    },
    series: [
      {
        name: 'Density',
        type: 'heatmap',
        data: data.map((item) => [item.xIndex, item.yIndex, item.value]),
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 0,
            borderColor: 'var(--ring)',
            borderWidth: 2
          }
        }
      }
    ]
  };

  return (
    <section className="space-y-3 rounded-xl border border-border bg-background/60 p-5">
      <header>
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      <div className="h-96">
        <ReactECharts style={{ height: '100%', width: '100%' }} option={option} notMerge lazyUpdate />
      </div>
    </section>
  );
}
