import Day11 from './day-11';

export default class Challenge21 extends Day11 {

  solve(): number {
    let totalFlashes = 0;
    const steps = 100;

    for (let iteration = 1; iteration <= steps; iteration += 1) {
      totalFlashes += this.step();
    }

    return totalFlashes;
  }

}
