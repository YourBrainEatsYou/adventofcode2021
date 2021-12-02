import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export class Challenge01 extends Challenge {

  private input: number[];

  constructor() {
    super();
    this.input = new FileReader(1)
      .getFileAsArray()
      .filter((val) => val !== '')
      .map((value) => parseInt(value));
  }

  solve(): number {
    let countLargerMeasurements = 0;
    let lastMeasurement = null;

    for (let measurement of this.input) {
      if (lastMeasurement !== null && measurement > lastMeasurement) {
        countLargerMeasurements += 1;
      }
      lastMeasurement = measurement;
    }

    return countLargerMeasurements;
  }
}
