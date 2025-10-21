import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react-dom/test-utils";
import { useFilters } from "@/store/useFilters";

// Helper to run zustand actions outside of React
const getState = () => useFilters.getState();

describe("useFilters store", () => {
  beforeEach(() => {
    act(() => {
      getState().reset();
    });
  });
  it("updates diagnosis filter", () => {
    act(() => {
      getState().setDiagnosis("Benign");
    });
    expect(getState().diagnosisFilter).toBe("Benign");
  });

  it("resets to defaults", () => {
    act(() => {
      getState().setFeatures(["a", "b"]);
      getState().reset();
    });
    expect(getState().selectedFeatures).toEqual([]);
    expect(getState().diagnosisFilter).toBe("All");
  });
});
