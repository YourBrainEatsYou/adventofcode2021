import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge15 implements Challenge {
  private readonly input: string[] = new FileReader(8, 'input.txt')
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split('|')[1])
    .map((line) => line.split(' ').filter((item) => item !== ''))
    .flat(1);

  solve(): number {
    let countEasyNumbers = 0;
    for (let number of this.input) {
      switch (number.length) {
        case 2: // 1
        case 4: // 4
        case 3: // 8
        case 7: // 9
          countEasyNumbers += 1;
          break;
        default:
          break;
      }
    }

    console.log(countEasyNumbers);
    return countEasyNumbers;
  }
}
