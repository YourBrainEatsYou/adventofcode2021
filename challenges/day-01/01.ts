import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.resolve() + '/challenges/day-01';

// read the input file
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

// convert list to readable array
const inputArray = input.split("\n").filter((val) => val !== '').map((value) => parseInt(value));

let countLargerMeasurements = 0;
let lastMeasurement = null;

for (let measurement of inputArray){
  if (lastMeasurement !== null && measurement > lastMeasurement){
    countLargerMeasurements += 1;
  }
  lastMeasurement = measurement;
}

// display the Answer
console.log('\x1b[32m%s\x1b[35m%s\x1b[0m','The Answer is: ', countLargerMeasurements);
