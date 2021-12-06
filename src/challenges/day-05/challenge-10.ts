import Day05 from './day-05';

export default class Challenge10 extends Day05 {
  solve(): number {
    for (let coords of this.input) {
      this.drawLine(coords[0], coords[1], false);
    }
    return this.countOverlaps();
  }
}
