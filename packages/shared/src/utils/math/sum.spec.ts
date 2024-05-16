import { describe, expect, it } from "vitest";
import { sum } from "./sum";

describe("math: sum", () => {
  it("should returns 0 if no arguments is given", () => {
    expect(sum()).toEqual(0);
  });

  it("should returns the correct sum of numbers when 1+ arguments are given", () => {
    expect(sum(42)).toEqual(42);
    expect(sum(1, 2, 3, 4, 5)).toEqual(15);
  });
});
