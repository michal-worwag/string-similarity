import { describe, expect, it } from "vitest";
import { compareTwoStrings, findBestMatch } from "./index.js";

describe("compareTwoStrings", () => {
  it("returns expected ratings from the original package examples", () => {
    expect(compareTwoStrings("healed", "sealed")).toBe(0.8);
    expect(
      compareTwoStrings(
        "Olive-green table for sale, in extremely good condition.",
        "For sale: table in very good  condition, olive green in colour.",
      ),
    ).toBe(0.6060606060606061);
    expect(
      compareTwoStrings(
        "Olive-green table for sale, in extremely good condition.",
        "For sale: green Subaru Impreza, 210,000 miles",
      ),
    ).toBe(0.2558139534883721);
    expect(
      compareTwoStrings(
        "Olive-green table for sale, in extremely good condition.",
        "Wanted: mountain bike with at least 21 gears.",
      ),
    ).toBe(0.1411764705882353);
  });

  it("handles identical, empty, and short strings", () => {
    expect(compareTwoStrings("", "")).toBe(1);
    expect(compareTwoStrings("hello", "hello")).toBe(1);
    expect(compareTwoStrings("ab", "ab")).toBe(1);
    expect(compareTwoStrings("a", "b")).toBe(0);
    expect(compareTwoStrings("a", "a")).toBe(1);
  });

  it("disregards spaces", () => {
    expect(compareTwoStrings("hello world", "helloworld")).toBe(1);
  });
});

describe("findBestMatch", () => {
  it("returns ratings, bestMatch, and bestMatchIndex", () => {
    expect(findBestMatch("healed", ["edward", "sealed", "theatre"])).toEqual({
      ratings: [
        { target: "edward", rating: 0.2 },
        { target: "sealed", rating: 0.8 },
        { target: "theatre", rating: 0.36363636363636365 },
      ],
      bestMatch: { target: "sealed", rating: 0.8 },
      bestMatchIndex: 1,
    });
  });

  it("throws on invalid arguments", () => {
    expect(() => findBestMatch("x", [])).toThrow(/Bad arguments/);
    // @ts-expect-error intentional runtime check
    expect(() => findBestMatch(1, ["a"])).toThrow(/Bad arguments/);
    // @ts-expect-error intentional runtime check
    expect(() => findBestMatch("x", [1])).toThrow(/Bad arguments/);
  });
});
