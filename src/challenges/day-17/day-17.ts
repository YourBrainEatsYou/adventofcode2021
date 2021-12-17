import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';
import { Coordinates, TargetArea, Velocity } from './interfaces/interfaces';

const regex = /x=([-0-9]+)[.]+([-0-9]+).+y=([-0-9]+)[.]+([-0-9]+)/g;

export default abstract class Day17 implements Challenge {

  readonly input: TargetArea = new FileReader(17)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => {
      let matches = regex.exec(line);
      if (matches[1] && matches[2] && matches[3] && matches[4]) {
        return {
          x: {
            from: parseInt(matches[1]),
            to: parseInt(matches[2]),
          },
          y: {
            from: parseInt(matches[4]),
            to: parseInt(matches[3]),
          },
        } as TargetArea;
      }
    })
    .shift();

  possibleVelocities: Velocity[] = [];
  highestYCoordinateReached: number = -Infinity;

  constructor() {
    this.bruteForceVelocities();
  }

  private static step(currentCoordinates: Coordinates, currentVelocity: Velocity): { newCoordinates: Coordinates, newVelocity: Velocity } {
    const newCoordinates: Coordinates = {
      x: currentCoordinates.x + currentVelocity.x,
      y: currentCoordinates.y + currentVelocity.y,
    };
    let velocityX = currentVelocity.x;
    if (velocityX > 0) {
      velocityX -= 1;
    } else if (velocityX < 0) {
      velocityX += 0;
    }
    const newVelocity: Velocity = {
      x: velocityX,
      y: currentVelocity.y - 1,
    };
    return { newCoordinates, newVelocity };
  }

  abstract solve(): number;

  private isInTargetArea({ x, y }: Coordinates): boolean {
    return ((this.input.x.from <= x && x <= this.input.x.to)
      && (this.input.y.from >= y && y >= this.input.y.to));
  }

  private canReachTarget({ x, y }: Coordinates): boolean {
    return (x <= this.input.x.to) && (y >= this.input.y.to);
  }

  private bruteForceVelocities() {
    for (let y = -500; y < 500; y += 1) {
      for (let x = -500; x < 500; x += 1) {
        let probe: Coordinates = { x: 0, y: 0 };
        let initialVelocity: Velocity = { x, y };
        let velocity: Velocity = { x, y };

        let highestOfVelocity = -Infinity;

        while (this.canReachTarget(probe)) {
          highestOfVelocity = Math.max(...[highestOfVelocity, probe.y]);
          if (this.isInTargetArea(probe)) {
            this.possibleVelocities.push(initialVelocity);
            this.highestYCoordinateReached = Math.max(...[this.highestYCoordinateReached, highestOfVelocity]);
            break;
          }
          let stepResult = Day17.step(probe, velocity);
          probe = stepResult.newCoordinates;
          velocity = stepResult.newVelocity;
        }
      }
    }
  }
}
