import { corrcoef } from "./stats";

export const FEATURE_SHORTLIST: string[] = [
  "radius_mean",
  "texture_mean",
  "perimeter_mean",
  "area_mean",
  "smoothness_mean",
  "compactness_mean",
  "symmetry_mean",
  "fractal_dimension_mean",
  "radius_worst",
  "texture_worst",
  "perimeter_worst",
  "area_worst",
  "smoothness_worst"
];

export const dropCorrelated = (columns: string[], corr: number[][], threshold = 0.9): string[] => {
  const keep = new Set(columns);
  for (let i = 0; i < columns.length; i += 1) {
    for (let j = i + 1; j < columns.length; j += 1) {
      const value = Math.abs(corr[i][j]);
      if (value >= threshold) {
        // drop the second column by default
        if (keep.has(columns[j])) {
          keep.delete(columns[j]);
        }
      }
    }
  }
  return columns.filter((col) => keep.has(col));
};

export const selectTopKFeatures = (
  matrix: number[][],
  columns: string[],
  k = 10
): string[] => {
  if (!matrix.length) return columns.slice(0, k);
  const corr = corrcoef(matrix);
  const scores = columns.map((_, idx) => {
    const sum = corr[idx].reduce((acc, value) => acc + Math.abs(value), 0) - 1;
    return { column: columns[idx], score: sum };
  });
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((item) => item.column);
};
