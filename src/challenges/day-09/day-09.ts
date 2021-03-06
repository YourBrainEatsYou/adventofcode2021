import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';
import Point from './interfaces/point';

export default abstract class Day09 implements Challenge {

  readonly input: number[][] = new FileReader(9)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => {
      return line.split('').map((height) => parseInt(height));
    });

  up(x: number, y: number): number | null {
    if (typeof this.input[y - 1] !== 'undefined') {
      return this.input[y - 1][x];
    }
    return null;
  }

  down(x: number, y: number): number | null {
    if (typeof this.input[y + 1] !== 'undefined') {
      return this.input[y + 1][x];
    }
    return null;
  }

  left(x: number, y: number): number | null {
    if (typeof this.input[y][x - 1] !== 'undefined') {
      return this.input[y][x - 1];
    }
    return null;
  }

  right(x: number, y: number): number | null {
    if (typeof this.input[y][x + 1] !== 'undefined') {
      return this.input[y][x + 1];
    }
    return null;
  }

  getDeepestPointsCoords(): Array<Point> {
    const points = [];

    for (let yIndex = 0; yIndex < this.input.length; yIndex += 1) {
      const row = this.input[yIndex];
      for (let xIndex = 0; xIndex < row.length; xIndex += 1) {
        const heightOfPoint = this.input[yIndex][xIndex];

        const up = this.up(xIndex, yIndex) !== null ? this.up(xIndex, yIndex) : 10;
        const down = this.down(xIndex, yIndex) !== null ? this.down(xIndex, yIndex) : 10;
        const left = this.left(xIndex, yIndex) !== null ? this.left(xIndex, yIndex) : 10;
        const right = this.right(xIndex, yIndex) !== null ? this.right(xIndex, yIndex) : 10;

        if (heightOfPoint < up
          && heightOfPoint < down
          && heightOfPoint < left
          && heightOfPoint < right
        ) {
          const point: Point = {
            x: xIndex,
            y: yIndex,
          };
          points.push(point);
        }
      }
    }

    return points;
  }

  abstract solve(): number;
}
