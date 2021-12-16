import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default class Challenge31 implements Challenge {
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

  versionTotal = 0;

  getPacketVersion(): number {
    return parseInt(this.transmission.slice(0, 3), 2);
  }

  getPacketType(): number {
    return parseInt(this.transmission.slice(3, 6), 2);
  }

  removeIdAndType() {
    this.transmission = this.transmission.slice(6);
  }

  parseLiteral(): number {
    let literal = '';
    // remove packageVersion and Type
    this.removeIdAndType();

    let hasMore = true;
    while (hasMore) {
      const literalByte = parseInt(this.transmission.slice(0, 5), 2);
      this.transmission = this.transmission.slice(5);

      literal += ((literalByte & 15)).toString(2).padStart(4, '0');
      hasMore = !!(literalByte & 16);
    }
    return parseInt(literal, 2);
  }

  parseOperator() {
    this.removeIdAndType();
    const length = this.transmission.slice(0, 1) === '0' ? 15 : 11;
    this.transmission = this.transmission.slice(1);

    this.transmission = this.transmission.slice(length);
  }

  parseNextPackage() {
    let packageVersion = this.getPacketVersion();
    let packageType = this.getPacketType();

    this.versionTotal += packageVersion;

    switch (packageType) {
      case 4:
        this.parseLiteral();
        break;
      default:
        this.parseOperator();
        break;
    }
  }

  solve(): number {
    while (this.transmission.includes('1')) {
      this.parseNextPackage();
    }
    return this.versionTotal;
  }
}
