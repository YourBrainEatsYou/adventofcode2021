import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default abstract class Day05 implements Challenge {
  readonly maxX: number = 0; // horizontal
  readonly maxY: number = 0; // vertical

  matrix: Array<Array<number>>;

  readonly input: [number, number][][] = new FileReader(5)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split(' -> ')
      .map((coordinates) => coordinates.split(',')
        .map((number) => parseInt(number, 10)) as [number, number],
      ),
    );

  constructor() {
    // get square size
    for (let line of this.input) {
      for (let coords of line) {
        this.maxX = coords[0] > this.maxX ? coords[0] : this.maxX;
        this.maxY = coords[1] > this.maxY ? coords[1] : this.maxY;
      }
    }

    // create matrix
    this.matrix = [];
    for (let index = 0; index <= this.maxY; index += 1) {
      this.matrix.push(Array(this.maxX).fill(0));
    }
  }

  drawLine([fromX, fromY]: [number, number], [toX, toY]: [number, number], ignoreDiagonal = true): void {
    if (fromX === toX || fromY === toY) {
      // straightLine
      this.drawStraightLine([fromX, fromY], [toX, toY]);
    } else if (!ignoreDiagonal) {
      this.drawDiagonalLine([fromX, fromY], [toX, toY]);
    }

  }

  countOverlaps(): number {
    let overlaps = 0;
    for (let row of this.matrix) {
      for (let col of row) {
        if (col > 1) {
          overlaps += 1;
        }
      }
    }

    return overlaps;
  }

  abstract solve(): number;

  private drawStraightLine([fromX, fromY]: [number, number], [toX, toY]: [number, number]) {
    const coordsArrayToDraw = [];
    if (fromX === toX && fromY === toY) {
      coordsArrayToDraw.push([fromX, fromY]);
    } else {
      if (fromX === toX) {
        if (fromY <= toY) {
          for (let yIndex = fromY; yIndex <= toY; yIndex += 1) {
            coordsArrayToDraw.push([fromX, yIndex]);
          }
        } else {
          for (let yIndex = toY; yIndex <= fromY; yIndex += 1) {
            coordsArrayToDraw.push([fromX, yIndex]);
          }
        }
      }
      if (fromY === toY) {
        if (fromX <= toX) {
          for (let xIndex = fromX; xIndex <= toX; xIndex += 1) {
            coordsArrayToDraw.push([xIndex, fromY]);
          }
        } else {
          for (let xIndex = toX; xIndex <= fromX; xIndex += 1) {
            coordsArrayToDraw.push([xIndex, fromY]);
          }
        }
      }
    }

    this.increaseOnMatrix(coordsArrayToDraw as Array<[number, number]>);
  }

  private drawDiagonalLine([fromX, fromY]: [number, number], [toX, toY]: [number, number]) {
    const coordsArrayToDraw = [];

    let currentCoords = [fromX, fromY];
    coordsArrayToDraw.push([...currentCoords]);
    while (currentCoords[0] !== toX && currentCoords[1] !== toY) {
      currentCoords[0] += currentCoords[0] > toX ? -1 : 1;
      currentCoords[1] += currentCoords[1] > toY ? -1 : 1;
      coordsArrayToDraw.push([...currentCoords]);
    }

    this.increaseOnMatrix(coordsArrayToDraw as Array<[number, number]>);
  }

  private increaseOnMatrix(numbers: Array<[number, number]>): void {
    for (let coords of numbers) {
      this.matrix[coords[1]][coords[0]] += 1;
    }
  }
}
