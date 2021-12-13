import Day13 from './day-13';

export default class Challenge25 extends Day13 {

  solve(): number {
    this.foldOrigami(this.instructions[0]);
    return this.origami.flat(1).reduce((a, b) => b ? a + 1 : a, 0);
  }
}
