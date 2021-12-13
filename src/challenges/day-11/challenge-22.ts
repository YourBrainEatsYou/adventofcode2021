import Day11 from './day-11';

export default class Challenge22 extends Day11 {

  solve(): number {
    const targetFlashes = this.input.flat(2).length;

    let stepFlashes = 0;
    let stepCount = 0;

    while (targetFlashes != stepFlashes) {
      stepCount += 1;
      stepFlashes = this.step();
    }

    return stepCount;
  }
}
