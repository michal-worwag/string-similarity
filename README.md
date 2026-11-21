# @michalwo/string-similarity

Finds the degree of similarity between two strings using [Dice's Coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) (bigram overlap). Returns a number between `0` (completely different) and `1` (identical).

Works with both ESM and CommonJS. Requires Node.js 18+.

## Install

```bash
npm install @michalwo/string-similarity
```

## Usage

```ts
import { compareTwoStrings, findBestMatch } from '@michalwo/string-similarity';

compareTwoStrings('healed', 'sealed');
// 0.8

compareTwoStrings('hello world', 'helloworld');
// 1 — spaces are ignored

findBestMatch('healed', ['edward', 'sealed', 'theatre']);
// {
//   ratings: [
//     { target: 'edward', rating: 0.2 },
//     { target: 'sealed', rating: 0.8 },
//     { target: 'theatre', rating: 0.36363636363636365 },
//   ],
//   bestMatch: { target: 'sealed', rating: 0.8 },
//   bestMatchIndex: 1,
// }
```

## API

### Types

```ts
type Rating = {
  target: string;
  rating: number;
};

type BestMatch = {
  ratings: Rating[];
  bestMatch: Rating;
  bestMatchIndex: number;
};
```

### `compareTwoStrings(string1, string2)`

Returns a number from `0` to `1` (inclusive). Higher means more similar.

```ts
compareTwoStrings('healed', 'sealed'); // 0.8
compareTwoStrings('hello', 'hello'); // 1
compareTwoStrings('a', 'b'); // 0
```

### `findBestMatch(mainString, targetStrings)`

Compares `mainString` against each entry in `targetStrings` and returns all ratings plus the best match.

```ts
findBestMatch('healed', ['edward', 'sealed', 'theatre']);
```

Throws if `mainString` is not a string, or if `targetStrings` is not a non-empty array of strings.

## Notes

- Comparison is **case-sensitive** (`'Hello'` ≠ `'hello'`).
- Whitespace is stripped before comparing (`'hello world'` equals `'helloworld'`).
- Identical strings always return `1`, including empty strings (`''` vs `''`).
- After removing spaces, strings shorter than 2 characters that are not identical return `0`.

## License

MIT
