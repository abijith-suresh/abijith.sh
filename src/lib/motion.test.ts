import { describe, expect, it } from "vitest";
import { listStagger, riseStep } from "./motion";

describe("riseStep", () => {
  it("returns sequential 100ms steps", () => {
    expect(riseStep(0)).toBe("0ms");
    expect(riseStep(1)).toBe("100ms");
    expect(riseStep(2)).toBe("200ms");
  });
});

describe("listStagger", () => {
  it("starts at 200ms and increments by 50ms", () => {
    expect(listStagger(0)).toBe("200ms");
    expect(listStagger(1)).toBe("250ms");
    expect(listStagger(2)).toBe("300ms");
  });

  it("caps stagger at eight items", () => {
    expect(listStagger(7)).toBe("550ms");
    expect(listStagger(8)).toBe("550ms");
    expect(listStagger(20)).toBe("550ms");
  });
});
