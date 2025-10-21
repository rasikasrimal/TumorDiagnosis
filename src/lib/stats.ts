export type Summary = {
  mean: number;
  std: number;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

const EPSILON = 1e-9;

export const mean = (values: number[]): number => {
  if (!values.length) return 0;
  return values.reduce((acc, value) => acc + value, 0) / values.length;
};

export const variance = (values: number[]): number => {
  if (values.length < 2) return 0;
  const mu = mean(values);
  return values.reduce((acc, value) => acc + (value - mu) ** 2, 0) / (values.length - 1);
};

export const std = (values: number[]): number => Math.sqrt(Math.max(variance(values), 0));

export const quantile = (values: number[], q: number): number => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
};

export const describe = (column: number[]): Summary => {
  if (!column.length) {
    return { mean: 0, std: 0, min: 0, q1: 0, median: 0, q3: 0, max: 0 };
  }
  const sorted = [...column].sort((a, b) => a - b);
  return {
    mean: mean(column),
    std: std(column),
    min: sorted[0],
    q1: quantile(sorted, 0.25),
    median: quantile(sorted, 0.5),
    q3: quantile(sorted, 0.75),
    max: sorted[sorted.length - 1]
  };
};

export const standardize = (matrix: number[][]): number[][] => {
  if (!matrix.length) return [];
  const columns = matrix[0].length;
  const means = Array.from({ length: columns }, (_, col) => mean(matrix.map((row) => row[col])));
  const stds = Array.from({ length: columns }, (_, col) => {
    const values = matrix.map((row) => row[col]);
    const s = std(values);
    return s === 0 ? 1 : s;
  });
  return matrix.map((row) =>
    row.map((value, col) => {
      return (value - means[col]) / (stds[col] || 1);
    })
  );
};

export const zScore = (value: number, mu: number, sigma: number): number => {
  if (Math.abs(sigma) < EPSILON) return 0;
  return (value - mu) / sigma;
};

export const covariance = (a: number[], b: number[]): number => {
  if (a.length !== b.length || a.length < 2) return 0;
  const meanA = mean(a);
  const meanB = mean(b);
  let total = 0;
  for (let i = 0; i < a.length; i += 1) {
    total += (a[i] - meanA) * (b[i] - meanB);
  }
  return total / (a.length - 1);
};

export const corrcoef = (matrix: number[][]): number[][] => {
  const rows = matrix.length;
  if (!rows) return [];
  const cols = matrix[0].length;
  const result: number[][] = Array.from({ length: cols }, () => Array(cols).fill(0));
  const columns = Array.from({ length: cols }, (_, col) => matrix.map((row) => row[col]));
  for (let i = 0; i < cols; i += 1) {
    for (let j = i; j < cols; j += 1) {
      if (i === j) {
        result[i][j] = 1;
      } else {
        const cov = covariance(columns[i], columns[j]);
        const denom = std(columns[i]) * std(columns[j]) + EPSILON;
        const value = cov / denom;
        result[i][j] = value;
        result[j][i] = value;
      }
    }
  }
  return result;
};
