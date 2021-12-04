import Day04 from './day-04';

export default class Challenge08 extends Day04{

  solve(): number {
    let boardWinningOrder: Array<number> = [];
    let boardsWithNoWin = this.boards.map(((value, index) => index));
    let lastCalledNumber: number | null;

    // call the numbers
    for(let call of this.numbers){

      const preNoWinBoards = [...boardsWithNoWin];

      for(let noWinIndex = 0; noWinIndex < preNoWinBoards.length; noWinIndex += 1){
        const boardIndex = preNoWinBoards[noWinIndex];

        this.markNumberOnCard(call, boardIndex);

        if(this.checkIfBoardHasWon(boardIndex) && boardWinningOrder.indexOf(boardIndex) === -1){
          boardWinningOrder.push(boardIndex);
          boardsWithNoWin.splice(boardsWithNoWin.indexOf(boardIndex), 1);
        }
      }
      lastCalledNumber = call;
      //check if all boards has won
      if(boardWinningOrder.length === this.boards.length){
        // all boards has won, so get out of here.
        break;
      }
    }

    return this.addUnmarkedNumbers(boardWinningOrder[boardWinningOrder.length -1]) * lastCalledNumber;
  }
}