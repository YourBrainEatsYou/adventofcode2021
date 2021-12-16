import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

interface Pointer{
  index: number;
  value: number;
}

export default class Challenge32 implements Challenge {
  readonly input: string = new FileReader(16)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) =>
      line.split('')
        .map((char) => (parseInt(char, 16)).toString(2).padStart(4, '0'))
        .join(''),
    )
    .shift();

  parseNextPackage(index: number): Pointer {
    const packageType = parseInt(this.input.slice(index + 3, index += 6),2);

    if(packageType === 4){
      // is Literal
      return this.parseLiteral(index);
    } else {
      // is Operator
      return this.parseOperator(index, packageType);
    }
  }

  parseLiteral(index: number): Pointer {
    let hasMore = true;
    let literal = '';

    while (hasMore) {
      const literalByte = parseInt(this.input.slice(index, index += 5), 2);

      literal += ((literalByte & 15)).toString(2).padStart(4, '0');
      hasMore = !!(literalByte & 16);
    }
    return {
      index,
      value: parseInt(literal, 2),
    }
  }

  parseOperator(index: number, packageType: number): Pointer {
    const lengthId: 11 | 15 = this.input.slice(index, index += 1) === '0' ? 15 : 11;
    const lengthCounter = parseInt(this.input.slice(index, index += lengthId), 2);
    const values = [];
    let value: number = 0;

    if(lengthId === 15){
      const endIndex = index + lengthCounter;
      while (index < endIndex){
        let { index: newIndex, value} = this.parseNextPackage(index);
        index = newIndex;
        values.push(value);
      }
    } else {
      while(values.length < lengthCounter){
        let { index: newIndex, value} = this.parseNextPackage(index);
        index = newIndex;
        values.push(value);
      }
    }

    // parse Operations
    switch (packageType) {
      case 0: // sum
        value = values.reduce((a, b) => a + b, 0);
       break;
      case 1: // product
        value = values.reduce((a, b) => a * b, 1);
        break;
      case 2: // min
        value = Math.min(...values);
        break;
      case 3: // max
        value = Math.max(...values);
        break;
      case 5: // greater than >
        value = +(values[0] > values[1]);
        break;
      case 6: // less than <
        value = +(values[0] < values[1]);
        break;
      case 7: // equal =
        value = +(values[0] === values[1]);
        break;
    }
    return { index, value };
  }

  solve(): number {
    return this.parseNextPackage(0).value;
  }
}
