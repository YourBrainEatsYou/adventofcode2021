import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

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

  transmission: string = this.input;

  getPacketVersion(): number {
    return parseInt(this.transmission.slice(0, 3), 2);
  }

  getPacketType(): number {
    return parseInt(this.transmission.slice(3, 6), 2);
  }

  removeIdAndType(): number {
    this.transmission = this.transmission.slice(6);
    return 6;
  }


  parseLiteral(): { bits: number, result: number } {
    let literal = '';
    let bitsRemoved = 0;
    // remove packageVersion and Type
    bitsRemoved += this.removeIdAndType();

    let hasMore = true;
    while (hasMore) {
      const literalByte = parseInt(this.transmission.slice(0, 5), 2);
      this.transmission = this.transmission.slice(5);
      bitsRemoved += 5;

      literal += ((literalByte & 15)).toString(2).padStart(4, '0');
      hasMore = !!(literalByte & 16);
    }
    console.log('lit: ', parseInt(literal, 2));
    return {
      bits: bitsRemoved,
      result: parseInt(literal, 2),
    };
  }

  * loop(length: 15 | 11, packageLength: number): Generator<{ bits: number, result: number }> {
    let bitsParsed = 0;

    if (length === 11) {
      for (let iteration = 0; iteration < packageLength; iteration += 1) {
        yield this.parseNextPackage();
      }
    } else {
      while (bitsParsed < packageLength) {
        let packageResult = this.parseNextPackage();
        bitsParsed += packageResult.bits;
        yield packageResult;
      }
    }
  }

  parseOperator(packageType: number): { bits: number, result: number } {
    let bitsRemoved = 0;

    bitsRemoved += this.removeIdAndType();

    let result = 0;

    const length = this.transmission.slice(0, 1) === '0' ? 15 : 11;
    this.transmission = this.transmission.slice(1);
    bitsRemoved += 1;

    const packageLength = parseInt(this.transmission.slice(0, length), 2);
    this.transmission = this.transmission.slice(length);
    bitsRemoved += length;

    let iter = this.loop(length, packageLength);
    let current;

    switch (packageType) {
      case 0: // sum
        result = 0;
        current = iter.next();
        while (!current.done) {
          result += current.value.result;
          current = iter.next();
        }
        break;
      case 1: // product
        result = 1;
        current = iter.next();
        while (!current.done) {
          result *= current.value.result;
          current = iter.next();
        }
        break;
      case 2: // min
        result = Infinity;
        current = iter.next();

        while (!current.done) {
          result = current.value.result < result ? current.value.result : result;
          current = iter.next();
        }
        break;
      case 3: // max
        current = iter.next();
        while (!current.done) {
          result = current.value.result > result ? current.value.result : result;
          current = iter.next();
        }
        break;
      case 5: // greater than >
        result = 0;
        if (this.parseNextPackage().result > this.parseNextPackage().result) {
          result = 1;
        }
        break;
      case 6: // less than <
        result = 0;
        if (this.parseNextPackage().result < this.parseNextPackage().result) {
          result = 1;
        }
        break;
      case 7: // equal =
        result = 0;
        if (this.parseNextPackage().result == this.parseNextPackage().result) {
          result = 1;
        }
        break;
    }

    return {
      bits: bitsRemoved,
      result,
    };
  }

  parseNextPackage(): { bits: number, result: number } {
    let packageType = this.getPacketType();

    // throw new Error(packageType.toString());

    switch (packageType) {
      case 4:
        return this.parseLiteral();
      default:
        return this.parseOperator(packageType);
    }
  }

  solve(): number {
    return this.parseNextPackage().result;
  }
}
