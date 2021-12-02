import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';


export class Challenge02 extends Challenge {
  private input: number[] = new FileReader(1)
    .getFileAsArray()
    .filter((val) => val !== '')
    .map((value) => parseInt(value));

  solve(): number {
    const sumOfMeasurements = [];

    for (let index = 0; index < this.input.length; index += 1) {
      if (this.input[index + 1] && this.input[index + 2]) {
        sumOfMeasurements.push(this.input[index] + this.input[index + 1] + this.input[index + 2]);
      }
    }

    let countLargerMeasurements = 0;
    let lastMeasurement = null;

    for (let measurement of sumOfMeasurements) {
      if (lastMeasurement !== null && measurement > lastMeasurement) {
        countLargerMeasurements += 1;
      }
      lastMeasurement = measurement;
    }

    return countLargerMeasurements;
  }
}
