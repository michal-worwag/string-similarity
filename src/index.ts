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
 * Spaces are disregarded.
 */
export function compareTwoStrings(string1: string, string2: string): number {
  const first = string1.replace(/\s+/g, "");
  const second = string2.replace(/\s+/g, "");

  if (first === second) return 1;
  if (first.length < 2 || second.length < 2) return 0;

  const firstBigrams = new Map<string, number>();
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.get(bigram) ?? 0;
    firstBigrams.set(bigram, count + 1);
  }

  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.get(bigram) ?? 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

/**
 * Compares `mainString` against each string in `targetStrings`.
 */
export function findBestMatch(
  mainString: string,
  targetStrings: readonly string[],
): BestMatch {
  if (!areArgsValid(mainString, targetStrings)) {
    throw new Error(
      "Bad arguments: First argument should be a string, second should be an array of strings",
    );
  }

  const ratings: Rating[] = [];
  let bestMatchIndex = 0;

  for (let i = 0; i < targetStrings.length; i++) {
    const currentTargetString = targetStrings[i]!;
    const currentRating = compareTwoStrings(mainString, currentTargetString);
    ratings.push({ target: currentTargetString, rating: currentRating });

    const bestSoFar = ratings[bestMatchIndex]!;
    if (currentRating > bestSoFar.rating) {
      bestMatchIndex = i;
    }
  }

  return {
    ratings,
    bestMatch: ratings[bestMatchIndex]!,
    bestMatchIndex,
  };
}

function areArgsValid(
  mainString: unknown,
  targetStrings: unknown,
): targetStrings is readonly string[] {
  if (typeof mainString !== "string") return false;
  if (!Array.isArray(targetStrings)) return false;
  if (targetStrings.length === 0) return false;
  return targetStrings.every((s) => typeof s === "string");
}
