import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export class Challenge06 extends Challenge {
  private readonly input: number[][] = new FileReader(3)
    .getFileAsArray()
    .filter((value) => value !== '')
    .map((value) => value.split('').map((val) => parseInt(val)));

  solve(): number {
    let oxygenGeneratorRatingArray = this.input;
    let co2ScrubberRatingArray = this.input;

    for (let position = 0; position < this.input[0].length; position += 1) {
      let oxyPositionCount = 0;
      let co2PositionCount = 0;
      if (oxygenGeneratorRatingArray.length > 1) {
        for (let item of oxygenGeneratorRatingArray) {
          oxyPositionCount += item[position];
        }
        oxygenGeneratorRatingArray = oxygenGeneratorRatingArray.filter((item) => item[position] === +(oxyPositionCount >= (oxygenGeneratorRatingArray.length / 2)));
      }

      if (co2ScrubberRatingArray.length > 1) {
        for (let item of co2ScrubberRatingArray) {
          co2PositionCount += item[position];
        }
        co2ScrubberRatingArray = co2ScrubberRatingArray.filter((item) => item[position] === +(co2PositionCount < (co2ScrubberRatingArray.length / 2)));
      }

    }
    const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingArray[0].join(''), 2);
    const co2ScrubberRating = parseInt(co2ScrubberRatingArray[0].join(''), 2);

    return oxygenGeneratorRating * co2ScrubberRating;
  }
}
