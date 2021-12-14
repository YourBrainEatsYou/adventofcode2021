import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge27 implements Challenge {

  private readonly input: string[] = new FileReader(14).getFileAsArray().filter((line) => line !== '');
  private template: string[] = [];
  private insertionRules: { [key: string]: string } = {};

  constructor() {
    for (let line of this.input) {
      if (line.includes(' -> ')) {
        // line is rule
        let rule: [string, string] = line.split(' -> ') as [string, string];
        this.insertionRules[rule[0]] = rule[1];
      } else {
        // line is template
        this.template = line.split('');
      }
    }
  }

  calculateElements(elements: string[]): number {
    const counts = Object.values(elements.reduce((acc: { [key: string]: number }, value: string) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }), {})).sort((a, b) => a - b);

    const most = counts.pop();
    const least = counts.shift();

    return most - least;
  }

  solve(): number {
    const numOfSteps = 40;

    for (let step = 0; step < numOfSteps; step += 1) {
      this.template = this.template.reduce((prev: string[], current: string) => {
        if (prev.length > 0) {
          const ruleToFind = prev[prev.length - 1] + current;
          if (this.insertionRules.hasOwnProperty(ruleToFind)) {
            prev.push(this.insertionRules[ruleToFind]);
          }
        }
        prev.push(current);
        return prev;
      }, []);
    }

    console.log(this.template.length);

    return this.calculateElements(this.template);
  }
}
