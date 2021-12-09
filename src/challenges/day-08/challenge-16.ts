import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

interface IO {
  input: string[],
  output: string[],
}

export default class Challenge15 implements Challenge {
  private readonly input: Array<IO> = new FileReader(8)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => {
      const partsResult = line.split('|');
      return {
        input: partsResult[0].split(' ')
          .filter((item) => item !== '')
          .map((item) => item.split('').sort().join(''))
          .sort((a, b) => a.length - b.length),
        output: partsResult[1].split(' ')
          .filter((item) => item !== '')
          .map((item) => item.split('').sort().join('')),
      } as IO;
    });

  /**
   * Normal map:
   *
   *  aaaa
   * b    c
   * b    c
   *  dddd
   * e    f
   * e    f
   *  gggg
   *
   * possible lengths / numbers per length
   * length:  | 1   | 2    | 3   | 4   | 5     | 6     | 7   |
   * numbers: | -   | 1    | 7   | 4   | 2,3,5 | 0,6,9 | 8   |
   *
   * Easy numbers: 1, 7, 4, 8
   *
   * then:
   *
   * Semi easy Numbers:
   * 3 => length == 5 & has to include 1
   * 9 => length == 6 & has to include 4
   *
   * then:
   *
   * Hard numbers:
   * 0 => length == 6 & has to include 7
   * 5 => length == 5 & is included in 9
   *
   * then:
   *
   * 2 => last man standing with length === 5
   * 6 => last man standing with length === 6
   */

  getSevenSegmentMap(inputValuesToDecode: Array<string>): Array<string> {
    const sevenSegmentMap = Array(10).fill('') as Array<string>;
    const lengthOf5Unsolved = [];
    const lengthOf6Unsolved = [];

    // set the easy numbers and prepare the semi and hard numbers array
    for (let inputValue of inputValuesToDecode) {
      switch (inputValue.length) {
        case 2: // 1
          sevenSegmentMap[1] = inputValue;
          break;
        case 3: // 7
          sevenSegmentMap[7] = inputValue;
          break;
        case 4: // 4
          sevenSegmentMap[4] = inputValue;
          break;
        case 5: // 2,3,5
          // solve 3 => length == 5 & has to include 1
          if (this.isXIncludedInY(sevenSegmentMap[1], inputValue)) {
            sevenSegmentMap[3] = inputValue;
          } else {
            lengthOf5Unsolved.push(inputValue);
          }
          break;
        case 6: // 0,6,9
          // solve 9 => length == 6 & has to include 4
          if (this.isXIncludedInY(sevenSegmentMap[4], inputValue)) {
            sevenSegmentMap[9] = inputValue;
          } else {
            lengthOf6Unsolved.push(inputValue);
          }
          break;
        case 7: // 8
          sevenSegmentMap[8] = inputValue;
          break;
      }
    }

    // solve 5 => length == 5 & is included in 9
    for (let item of lengthOf5Unsolved) {
      if (this.isXIncludedInY(item, sevenSegmentMap[9])) {
        sevenSegmentMap[5] = item;
        lengthOf5Unsolved.splice(lengthOf5Unsolved.indexOf(item), 1);
        break;
      }
    }

    // solve 0 => length == 6 & has to include 7
    for (let item of lengthOf6Unsolved) {
      if (this.isXIncludedInY(sevenSegmentMap[7], item)) {
        sevenSegmentMap[0] = item;
        lengthOf6Unsolved.splice(lengthOf6Unsolved.indexOf(item), 1);
        break;
      }
    }

    // they should only be one sting in each array remaining
    // solve 2 => last man standing with length === 5
    if (lengthOf5Unsolved.length === 1) {
      sevenSegmentMap[2] = lengthOf5Unsolved.shift();
    }
    // solve 6 => last man standing with length === 6
    if (lengthOf6Unsolved.length === 1) {
      sevenSegmentMap[6] = lengthOf6Unsolved.shift();
    }

    return sevenSegmentMap;
  }

  isXIncludedInY(x: string, y: string): boolean {
    const xArray = x.split('');
    const yArray = y.split('');

    return xArray.filter((item) => !yArray.includes(item)).length === 0;
  }

  decryptOutput(sevenSegmentMap: Array<string>, input: Array<string>): number {
    let outputString = '';
    for (let number of input) {
      let index = sevenSegmentMap.indexOf(number);
      if (index !== -1) {
        outputString += index.toString();
      } else {
        console.error('Now something is broken!');
      }
    }
    return parseInt(outputString, 10);
  }


  solve(): number {
    let sumOfTotalNumbers = 0;

    for (let io of this.input) {
      sumOfTotalNumbers += this.decryptOutput(this.getSevenSegmentMap(io.input), io.output);
    }

    return sumOfTotalNumbers;
  }
}
