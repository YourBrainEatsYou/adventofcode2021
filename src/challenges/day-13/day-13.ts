import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

type Direction = 'x' | 'y'

interface Instruction {
  direction: Direction,
  position: number,
}

export default abstract class Day13 implements Challenge {
  origami: boolean[][] = [];
  readonly instructions: Instruction[] = [];
  private readonly input: string[] = new FileReader(13).getFileAsArray();
  private points: number[][] = [];
  private maxY = 0;
  private maxX = 0;

  constructor() {
    // prepare origami and instructions
    for (let line of this.input) {
      line = line.replace('fold along ', '');
      let point = line.split(',');
      let instruction = line.split('=');

      if (point.length == 2) {
        let coords = point.map((coord) => parseInt(coord, 10));

        // console.log(coords);
        this.maxX = coords[0] > this.maxX ? coords[0] : this.maxX;
        this.maxY = coords[1] > this.maxY ? coords[1] : this.maxY;

        this.points.push(coords);
      }
      if (instruction.length == 2) {
        this.instructions.push({
          direction: instruction[0],
          position: parseInt(instruction[1]),
        } as Instruction);
      }
    }
    // prepare origami
    for (let yIndex = 0; yIndex <= this.maxY; yIndex++) {
      this.origami.push(Array(this.maxX + 1).fill(false));
    }

    // fill origami
    for (let point of this.points) {
      this.origami[point[1]][point[0]] = true;
    }
  }

  displayOrigami(origami: boolean[][]) {
    console.log(origami.map((line) => line.map((val) => val ? '#' : '.').join('')).join('\n'));
  }

  foldOrigami(instruction: Instruction) {
    switch (instruction.direction) {
      case 'x': // fold left
        this.foldLeft(instruction.position);
        break;
      case 'y': // fold up
        this.foldUp(instruction.position);
        break;
    }
  }

  foldLeft(atPosition: number) {
    let leftPart = this.origami.map((line) => line.slice(0, atPosition));
    let rightPart = this.origami.map((line) => line.slice(atPosition + 1, line.length).reverse());
    this.origami = this.execArrayCombination(leftPart, rightPart);
  }

  foldUp(atPosition: number) {
    let upperPart = this.origami.slice(0, atPosition);
    let lowerPart = this.origami.slice(atPosition + 1, this.origami.length).reverse();
    this.origami = this.execArrayCombination(upperPart, lowerPart);
  }

  execArrayCombination(array1: boolean[][], array2: boolean[][]) {
    const resultArray = [];

    for (let yIndex = 0; yIndex < array1.length; yIndex += 1) {
      const row = array1[yIndex];
      resultArray.push(Array(row.length).fill(false));
      for (let xIndex = 0; xIndex < row.length; xIndex += 1) {
        const value1 = array1[yIndex][xIndex];
        const value2 = array2[yIndex][xIndex];

        if (value1 || value2) {
          resultArray[yIndex][xIndex] = true;
        }
      }
    }
    return resultArray;
  }

  abstract solve(): number;
}
