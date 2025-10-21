import { describe, it, expect } from "vitest";
import { standardize, corrcoef, describe as describeColumn } from "@/lib/stats";

describe("stats", () => {
  it("standardizes columns to mean zero", () => {
    const matrix = [
      [1, 2],
      [3, 4],
      [5, 6]
    ];
    const result = standardize(matrix);
    const means = result.reduce(
      (acc, row) => {
        acc[0] += row[0];
        acc[1] += row[1];
        return acc;
      },
      [0, 0]
    );
    expect(means[0]).toBeCloseTo(0);
    expect(means[1]).toBeCloseTo(0);
  });

  it("computes correlation coefficients", () => {
    const matrix = [
      [1, 2],
      [2, 4],
      [3, 6]
    ];
    const corr = corrcoef(matrix);
    expect(corr[0][0]).toBeCloseTo(1);
    expect(corr[0][1]).toBeCloseTo(1);
  });

  it("describes a column", () => {
    const stats = describeColumn([1, 2, 3, 4]);
    expect(stats.mean).toBe(2.5);
    expect(stats.median).toBe(2.5);
    expect(stats.min).toBe(1);
  });
});
