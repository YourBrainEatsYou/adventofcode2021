import Day04 from './day-04';

export default class Challenge07 extends Day04 {
  solve(): number {
    // call the numbers
    for (let call of this.numbers) {
      this.markNumberOnCards(call);
      let winningBoardIndex = this.getWinningBoard();
      if (winningBoardIndex !== null) {
        return this.addUnmarkedNumbers(winningBoardIndex) * call;
      }
    }

    return null;
  }
}