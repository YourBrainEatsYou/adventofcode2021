import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

export default abstract class Day11 implements Challenge {
  input: number[][] = new FileReader(11)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split('')
      .filter((line) => line !== '')
      .map((item) => parseInt(item)),
    );

  increaseAdjacentOctopuses(x: number, y: number) {
    const adjacentMap = [
      [-1, -1], // top left
      [0, -1], // top
      [1, -1], // top right

      [-1, 0], // mid left
      [0, 0], // mid
      [1, 0], // mid right

      [-1, 1], // bottom left
      [0, 1], // bottom
      [1, 1], // bottom right
    ];

    adjacentMap.forEach((modifier) => {
      if (typeof this.input[y + modifier[1]] !== 'undefined' && typeof this.input[y + modifier[1]][x + modifier[0]] !== 'undefined') {
        if (this.input[y + modifier[1]][x + modifier[0]] !== -1) {
          // has not flashed in this step
          this.input[y + modifier[1]][x + modifier[0]] += 1;
        }
      }
    });
  }

  step(): number {
    let flashesInStep = 0;
    // increase all energy levels
    this.input.forEach((row, yIndex) => {
      row.forEach(((energyLevel, xIndex) => {
        this.input[yIndex][xIndex] = energyLevel + 1;
      }));
    });

    let hasFlashed = false;

    do {
      hasFlashed = false;
      this.input.forEach((row, yIndex) => {
        row.forEach((energyLevel, xIndex) => {
          if (energyLevel > 9) {

            // flash octopus and increase adjacents
            this.increaseAdjacentOctopuses(xIndex, yIndex);
            this.input[yIndex][xIndex] = -1;
            flashesInStep += 1;

            hasFlashed = true;
          }
        });
      });
    } while (hasFlashed);

    // reset -1 to 0
    this.input.forEach((row, yIndex) => {
      row.forEach(((energyLevel, xIndex) => {
        if (this.input[yIndex][xIndex] === -1) {
          this.input[yIndex][xIndex] = 0;
        }
      }));
    });

    return flashesInStep;
  }


  abstract solve(): number;
}
