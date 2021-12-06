import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export class Challenge02 implements Challenge {
  private readonly input: number[] = new FileReader(1)
    .getFileAsArray()
    .filter((val) => val !== '')
    .map((value) => parseInt(value));

  solve(): number {
    const sumOfMeasurements: number[] = [];
    let countLargerMeasurements: number = 0;

    for (let index = 0; index < this.input.length; index += 1) {
      if (this.input[index + 1] && this.input[index + 2]) {
        sumOfMeasurements.push(this.input[index] + this.input[index + 1] + this.input[index + 2]);

        if (sumOfMeasurements.length > 1) {
          if (sumOfMeasurements[sumOfMeasurements.length - 1] > sumOfMeasurements[sumOfMeasurements.length - 2]) {
            countLargerMeasurements += 1;
          }
        }
      }
    }

    return countLargerMeasurements;
  }
}
