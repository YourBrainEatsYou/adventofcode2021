import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge11 implements Challenge {
  private readonly input: number[] = new FileReader(6, 'test-input.txt')
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split(',').map((num) => parseInt(num, 10)))
    .flat(1);

  lanternfishPopulation = [...this.input];

  tick() {
    let newPopulation = [];

    for (let fish of this.lanternfishPopulation) {
      if (fish === 0) {
        newPopulation.push(6); // reset Fish to 6
        newPopulation.push(8); // spawn new Fish
      } else {
        fish += -1; // decrease timer
        newPopulation.push(fish);
      }
    }

    this.lanternfishPopulation = [...newPopulation];
  }

  solve(): number {
    const days = 80;

    for (let day = 0; day < days; day += 1) {
      this.tick();
    }

    return this.lanternfishPopulation.length;
  }
}
