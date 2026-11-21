# @michalwo/string-similarity

Finds degree of similarity between strings, based on Dice's Coefficient.

## Install

```bash
npm install @michalwo/string-similarity
```

## Usage

```ts
import { compareTwoStrings, findBestMatch } from '@michalwo/string-similarity';

const similarity = compareTwoStrings('healed', 'sealed');

const matches = findBestMatch('healed', ['edward', 'sealed', 'theatre']);
```

## API

### `compareTwoStrings(string1, string2)`

Returns a number from `0` to `1` (inclusive). Higher means more similar. Case-sensitive.

### `findBestMatch(mainString, targetStrings)`

Compares `mainString` against each entry in `targetStrings`.

Returns:

```ts
{
  ratings: Array<{ target: string; rating: number }>;
  bestMatch: {
    target: string;
    rating: number;
  }
  bestMatchIndex: number;
}
```

## License

MIT
