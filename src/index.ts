export type Rating = {
  target: string;
  rating: number;
};

export type BestMatch = {
  ratings: Rating[];
  bestMatch: Rating;
  bestMatchIndex: number;
};

/**
 * Returns a fraction between 0 and 1 indicating similarity (Dice's Coefficient).
 * 0 = completely different, 1 = identical. Comparison is case-sensitive.
 */
export function compareTwoStrings(_string1: string, _string2: string): number {
  throw new Error("Not implemented");
}

/**
 * Compares `mainString` against each string in `targetStrings`.
 */
export function findBestMatch(
  _mainString: string,
  _targetStrings: readonly string[],
): BestMatch {
  throw new Error("Not implemented");
}
