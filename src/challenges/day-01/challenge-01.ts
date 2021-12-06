import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export class Challenge01 implements Challenge {
  private readonly input: number[] = new FileReader(1)
    .getFileAsArray()
    .filter((val) => val !== '')
    .map((value) => parseInt(value));

  solve(): number {
    let countLargerMeasurements: number = 0;
    let lastMeasurement: number | null = null;

    for (let measurement of this.input) {
      if (lastMeasurement !== null && measurement > lastMeasurement) {
        countLargerMeasurements += 1;
      }
      lastMeasurement = measurement;
    }

    return countLargerMeasurements;
  }
}
