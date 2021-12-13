import * as fs from 'fs';
import * as path from 'path';

export class FileReader {

  private dayString = '';
  private fileName = '';

  constructor(
    day: number,
    fileName: string = 'input.txt',
  ) {
    this.dayString = day.toString(10).padStart(2, '0');
    this.fileName = fileName;
  }

  getFileAsString(): string {
    return fs.readFileSync(path.resolve(path.join(__dirname, `../challenges/day-${this.dayString}/${this.fileName}`)), 'utf8');
  }

  getFileAsArray(): string[] {
    return this.getFileAsString().split('\n');
  }
}
