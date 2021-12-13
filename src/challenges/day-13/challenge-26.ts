import Day13 from './day-13';

export default class Challenge26 extends Day13 {

  solve(): number {
    for (let instruction of this.instructions) {
      this.foldOrigami(instruction);
    }

    this.displayOrigami(this.origami);

    return this.origami.flat(1).reduce((a, b) => b ? a + 1 : a, 0);
  }
}
