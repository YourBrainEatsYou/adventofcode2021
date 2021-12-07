import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge14 implements Challenge {
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
        let fuelPoints = Math.abs(index - crab);
        fuelForCurrentIndex += (fuelPoints + 1) * (fuelPoints / 2);

        // big no no below here took the execution time * 100
        /*for (let fuel = 1; fuel <= fuelPoints; fuel += 1) {
          fuelForCurrentIndex += fuel;
        }*/
      }
      if (fuelForCurrentIndex < leastFuelConsumption || leastFuelConsumption === null) {
        leastFuelConsumption = fuelForCurrentIndex;
      }
    }
    return leastFuelConsumption;
  }
}
