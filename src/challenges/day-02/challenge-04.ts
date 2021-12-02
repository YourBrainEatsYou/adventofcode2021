import {FileReader} from '../../utils';
import {Challenge} from '../../utils/Challenge';

export class Challenge04 extends Challenge{
  private input: string[] = new FileReader(2)
    .getFileAsArray()
    .filter((val) => val !== '');

  solve(): number {
    const position = [0, 0, 0];

    for (let command of this.input){
      // split command in command & steps
      let cmd = command.split(' ');

      switch (cmd[0]){
        case 'forward':
          position[0] += parseInt(cmd[1]);
          position[1] += position[2] * parseInt(cmd[1]);
          break;
        case 'down':
          // position[1] += parseInt(cmd[1]);
          position[2] += parseInt(cmd[1]);
          break;
        case 'up':
          // position[1] -= parseInt(cmd[1]);
          position[2] -= parseInt(cmd[1]);
          break;
      }
    }

    return position[0] * position[1];
  }
}
