import { describe, expect, it } from "vitest";
import { groupByYear } from "./group-by-year";
import { getWritingUrl } from "./routes";
import { calculateReadingTime, formatDate, formatReadingTime } from "./utils";

describe("formatDate", () => {
  it("formats a date in lowercase en-US long format", () => {
    expect(formatDate(new Date(2026, 5, 11))).toBe("june 11, 2026");
  });

  it("handles end of year", () => {
    expect(formatDate(new Date(2025, 11, 31))).toBe("december 31, 2025");
  });

  it("handles leap year", () => {
    expect(formatDate(new Date(2024, 1, 29))).toBe("february 29, 2024");
  });
});

describe("calculateReadingTime", () => {
  it("returns 0 for empty or whitespace content", () => {
    expect(calculateReadingTime("")).toBe(0);
    expect(calculateReadingTime("   ")).toBe(0);
  });

  it("returns 1 for content under the words-per-minute threshold", () => {
    expect(calculateReadingTime("hello world")).toBe(1);
  });

  it("returns 1 for exactly 200 words at default WPM", () => {
    const words = Array.from({ length: 200 }, (_, i) => `word${i}`).join(" ");
    expect(calculateReadingTime(words)).toBe(1);
  });

  it("ceil rounding for content over one minute", () => {
    const words = Array.from({ length: 201 }, (_, i) => `word${i}`).join(" ");
    expect(calculateReadingTime(words)).toBe(2);
  });

  it("accepts a custom words-per-minute", () => {
    const words = Array.from({ length: 100 }, (_, i) => `word${i}`).join(" ");
    expect(calculateReadingTime(words, 50)).toBe(2);
  });
});

describe("formatReadingTime", () => {
  it("formats 1 minute", () => {
    expect(formatReadingTime(1)).toBe("1 min read");
  });

  it("formats multiple minutes", () => {
    expect(formatReadingTime(5)).toBe("5 min read");
    expect(formatReadingTime(12)).toBe("12 min read");
  });

  it("formats 0 minutes", () => {
    expect(formatReadingTime(0)).toBe("0 min read");
  });
});

describe("groupByYear", () => {
  it("returns empty array for empty input", () => {
    expect(groupByYear([], () => new Date())).toEqual([]);
  });

  it("groups items by year and sorts descending", () => {
    const items = [
      { id: "a", date: new Date(2025, 0, 1) },
      { id: "b", date: new Date(2026, 0, 1) },
      { id: "c", date: new Date(2024, 0, 1) },
    ];
    const result = groupByYear(items, (item) => item.date);

    expect(result).toHaveLength(3);
    expect(result[0].year).toBe(2026);
    expect(result[1].year).toBe(2025);
    expect(result[2].year).toBe(2024);
  });

  it("groups multiple items from the same year together", () => {
    const items = [
      { id: "a", date: new Date(2026, 0, 1) },
      { id: "b", date: new Date(2026, 5, 15) },
      { id: "c", date: new Date(2025, 0, 1) },
    ];
    const result = groupByYear(items, (item) => item.date);

    expect(result).toHaveLength(2);
    const year2026 = result.find((g) => g.year === 2026);
    expect(year2026?.items).toHaveLength(2);
    expect(year2026?.items[0].id).toBe("a");
    expect(year2026?.items[1].id).toBe("b");
  });

  it("preserves insertion order within groups", () => {
    const items = [
      { id: "c", date: new Date(2026, 0, 1) },
      { id: "a", date: new Date(2026, 0, 1) },
      { id: "b", date: new Date(2026, 0, 1) },
    ];
    const result = groupByYear(items, (item) => item.date);

    expect(result[0].items.map((i) => i.id)).toEqual(["c", "a", "b"]);
  });
});

describe("getWritingUrl", () => {
  it("returns the correct URL for a writing entry", () => {
    expect(getWritingUrl("why-i-built-my-own-website")).toBe(
      "/writing/why-i-built-my-own-website/"
    );
  });
});
