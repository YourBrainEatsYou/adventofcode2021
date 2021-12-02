import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';
import { Command, CommandType, Position } from './interfaces';

export class Challenge03 extends Challenge {
  private input: Command[] = new FileReader(2)
    .getFileAsArray()
    .filter((value) => value !== '')
    .map((value) => {
      const [type, times] = value.split(' ') as [CommandType, string];
      return { type, times: parseInt(times) };
    });

  private position: Position = {
    horizontal: 0,
    depth: 0,
  }

  solve(): number {
    for (let command of this.input) {
      switch (command.type) {
        case 'forward':
          this.position.horizontal += command.times;
          break;
        case 'down':
          this.position.depth += command.times;
          break;
        case 'up':
          this.position.depth -= command.times;
          break;
      }
    }
    return this.position.horizontal * this.position.depth;
  }
}
