import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

const BRACKETS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export default class Challenge19 implements Challenge {
  readonly input: string[][] = new FileReader(10)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split('').filter((line) => line !== ''));

  getFirstIllegalCharacter(line: string[]): string | null {
    let closingStack = [];

    for (let brace of line) {
      if (BRACKETS.hasOwnProperty(brace)) {
        // is opening brace
        closingStack = [BRACKETS[brace], ...closingStack];
      } else {
        // is closing, so the first element of the closingstack should match
        const predictedClosingItem = closingStack.shift();
        if (predictedClosingItem !== brace) {
          return brace;
        }
      }
    }
    return null;
  }

  solve(): number {
    let illegalBrackets = [];
    for (let line of this.input) {
      const illegalBracket = this.getFirstIllegalCharacter(line);
      if (illegalBracket !== null) {
        illegalBrackets.push(illegalBracket);
      }
    }

    return illegalBrackets.map((bracket) => POINTS[bracket]).reduce((a, b) => a + b);
  }
}
