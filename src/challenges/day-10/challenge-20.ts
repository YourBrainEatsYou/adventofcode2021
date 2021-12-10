import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

const BRACKETS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const POINTS = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export default class Challenge20 implements Challenge {
  readonly input: string[][] = new FileReader(10)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split('').filter((line) => line !== ''));

  getClosingStack(line: string[]): string[] {
    let closingStack = [];

    for (let brace of line) {
      if (BRACKETS.hasOwnProperty(brace)) {
        // is opening brace
        closingStack = [BRACKETS[brace], ...closingStack];
      } else {
        // is closing, so the first element of the closingStack should match
        const predictedClosingItem = closingStack.shift();
        if (predictedClosingItem !== brace) {
          // if the closing brace dont match its an corrupted line
          return null;
        }
      }
    }
    return closingStack;
  }

  solve(): number {
    let closingStacks = [];

    for (let line of this.input) {
      const closingStack = this.getClosingStack(line);
      if (closingStack !== null) {
        closingStacks.push(closingStack);
      }
    }

    let totals = [];

    for (let stack of closingStacks) {
      let stackTotal = 0;
      for (let brace of stack) {
        stackTotal = (stackTotal * 5) + POINTS[brace];
      }
      totals.push(stackTotal);
    }
    totals.sort((a, b) => a - b);

    return totals[(totals.length - 1) / 2];
  }

}
