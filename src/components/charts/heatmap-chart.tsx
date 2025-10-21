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
    backgroundColor: 'transparent',
    textStyle: {
      color: 'hsl(var(--muted-foreground))',
      fontFamily: "var(--font-sans), system-ui, sans-serif"
    },
    tooltip: {
      position: 'top',
      borderColor: 'hsl(var(--border))',
      backgroundColor: 'hsl(var(--background))',
      textStyle: { color: 'hsl(var(--foreground))' }
    },
    grid: { top: 24, right: 12, bottom: 40, left: 88 },
    xAxis: {
      type: 'category',
      data: xCategories,
      splitArea: {
        show: true,
        areaStyle: {
          color: ['color-mix(in srgb, hsl(var(--surface-elevated)) 80%, transparent)', 'transparent']
        }
      },
      axisLine: {
        lineStyle: { color: 'hsl(var(--border))' }
      },
      axisTick: { show: false },
      axisLabel: { color: 'hsl(var(--muted-foreground))' }
    },
    yAxis: {
      type: 'category',
      data: yCategories,
      splitArea: {
        show: true,
        areaStyle: {
          color: ['transparent', 'color-mix(in srgb, hsl(var(--surface-muted)) 65%, transparent)']
        }
      },
      axisLine: {
        lineStyle: { color: 'hsl(var(--border))' }
      },
      axisTick: { show: false },
      axisLabel: { color: 'hsl(var(--muted-foreground))' }
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map((item) => item.value), 1),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      textStyle: {
        color: 'hsl(var(--muted-foreground))'
      },
      inRange: {
        color: ['hsl(var(--background))', 'hsl(var(--accent))', 'hsl(var(--primary))']
      }
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
            borderColor: 'hsl(var(--ring))',
            borderWidth: 2
          }
        }
      }
    ]
  };

  return (
    <section className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
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
