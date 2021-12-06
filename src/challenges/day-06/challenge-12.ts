import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge12 implements Challenge {
  lanternfishPopulation = Array(9).fill(0);
  private readonly input: number[] = new FileReader(6, 'input.txt')
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split(',').map((num) => parseInt(num, 10)))
    .flat(1);

  constructor() {
    // prepare initial population
    for (let fish of this.input) {
      this.lanternfishPopulation[fish] += 1;
    }

  }

  tick() {
    // rotate Array
    const fishesToReset = this.lanternfishPopulation.shift();
    this.lanternfishPopulation[8] = 0;

    this.lanternfishPopulation[6] += fishesToReset;
    this.lanternfishPopulation[8] += fishesToReset;
  }

  solve(): number {
    const days = 256;

    for (let day = 0; day < days; day += 1) {
      this.tick();
    }

    return this.lanternfishPopulation.reduce((prev, curr) => prev + curr);
  }
}
