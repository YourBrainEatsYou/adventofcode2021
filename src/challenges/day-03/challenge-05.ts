import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge05 implements Challenge {

  private readonly input: number[][] = new FileReader(3)
    .getFileAsArray()
    .filter((value) => value !== '')
    .map((value) => value.split('').map((val) => parseInt(val)));

  solve(): number {
    let result = Array(this.input[0].length).fill(0);
    let binaryString = '';

    for (let binarySet of this.input) {
      for (let index = 0; index < binarySet.length; index += 1) {
        result[index] += binarySet[index];
      }
    }
    for (let bit of result) {
      binaryString += (bit > (this.input.length / 2)) ? '1' : '0';
    }

    // convert binary String to number
    let gammaRate = parseInt(binaryString, 2);
    let epsilonRate = (parseInt(''.padStart(this.input[0].length, '1'), 2) ^ parseInt(binaryString, 2));

    return gammaRate * epsilonRate;
  }
}
