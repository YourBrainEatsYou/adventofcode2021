import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge28 implements Challenge {
  private readonly input: string[] = new FileReader(14).getFileAsArray().filter((line) => line !== '');
  private template: string[] = [];

  private occurrences: { [key: string]: number } = {};
  private insertionRules: { [key: string]: string } = {};
  private charCount: { [key: string]: number } = {};

  constructor() {
    for (let line of this.input) {
      if (line.includes(' -> ')) {
        // line is rule
        let rule: [string, string] = line.split(' -> ') as [string, string];
        this.insertionRules[rule[0]] = rule[1];
        this.occurrences[rule[0]] = 0;

      } else {
        // line is template
        this.template = line.split('');
      }
    }

    // initialCharCount
    for (let char of this.template) {
      this.charCount[char] = (this.charCount[char] || 0) + 1;
    }

    this.parseTemplateAndAddToOcurrences(this.template);
  }

  parseTemplateAndAddToOcurrences(template: string[], multiplier: number = 1) {
    for (let index = 0; index < template.length - 1; index += 1) {
      const searchIndex = template[index] + template[index + 1];

      this.occurrences[searchIndex] = (this.occurrences[searchIndex] || 0) + multiplier;
    }
  }

  executeRulesOntoPolymers(): void {
    const occurrences = Object.keys(this.occurrences).filter((item: string) => this.occurrences[item] > 0);
    const occurrencesCopy: { [key: string]: number } = { ...this.occurrences };
    this.occurrences = {};

    for (let occurrence of occurrences) {
      const insert = this.insertionRules[occurrence];
      const newTempalte = [occurrence[0], insert, occurrence[1]];
      const multiplier = occurrencesCopy[occurrence];

      this.charCount[insert] = (this.charCount[insert] || 0) + multiplier;

      this.parseTemplateAndAddToOcurrences(newTempalte, multiplier);
    }
  }

  calculateElements(): number {
    const counts = Object.values(this.charCount).sort((a, b) => a - b);

    const most = counts.pop();
    const least = counts.shift();

    return most - least;
  }


  solve(): number {
    const numOfSteps = 40;

    for (let step = 0; step < numOfSteps; step += 1) {
      this.executeRulesOntoPolymers();
    }

    return this.calculateElements();
  }
}
