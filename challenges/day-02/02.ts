import * as fs from 'fs';
import * as path from 'path';

type CommandType = 'forward' | 'down' | 'up';

const __dirname = path.resolve() + '/challenges/day-02';

// read the input file
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

// convert list to readable array
const inputArray = input.split("\n").filter((val) => val !== '');

// horizontal / depth
const position = [0,0];

for (let command of inputArray){
  // split command in command & steps
  let cmd = command.split(' ');

  console.log(cmd);

  switch (cmd[0]){
    case 'forward':
      position[0] += parseInt(cmd[1]);
      break;
    case 'down':
      position[1] += parseInt(cmd[1]);
      break;
    case 'up':
      position[1] -= parseInt(cmd[1]);
      break;
  }
}

const result = position[0] * position[1];

// display the Answer
console.log('\x1b[32m%s\x1b[35m%s\x1b[0m','The Answer is: ', result);
