import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge13 implements Challenge {
  private readonly input: number[] = new FileReader(7, 'input.txt')
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split(',').map((num) => parseInt(num, 10)))
    .flat(1)
    .sort((a, b) => a - b);

  solve(): number {
    let leastFuelConsumption = null;

    for (let index = 0; index <= this.input[this.input.length - 1]; index += 1) {
      let fuelForCurrentIndex = 0;
      for (let crab of this.input) {
        fuelForCurrentIndex += Math.abs(index - crab);
      }
      if (fuelForCurrentIndex < leastFuelConsumption || leastFuelConsumption === null) {
        leastFuelConsumption = fuelForCurrentIndex;
      }
    }
    return leastFuelConsumption;
  }
}
