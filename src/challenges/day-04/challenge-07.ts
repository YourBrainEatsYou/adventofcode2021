import { Challenge } from '../../utils/Challenge';
import { FileReader } from '../../utils';

export default class Challenge07 implements Challenge{

  private readonly input: Array<string> = new FileReader(4).getFileAsArray();

  private numbers: Array<number> = [];
  private boards: Array<Array<Array<number>>> = [];
  private boardsMarks: Array<Array<Array<boolean>>> = []; // track witch numbers were called

  constructor() {
    // prepare input
    for(let index = 0; index < this.input.length; index += 1){
      const line = this.input[index];

      if(index === 0){
        this.numbers = line.split(',').map((value) => parseInt(value, 10));
        continue;
      }

      // its an empty line, so prepare next board
      if(line === ''){
        this.boards.push([]);
        this.boardsMarks.push([]);
        continue;
      }


      // add values to the current board
      const items: Array<number> = line.split(' ').filter((val) => val !== '').map((val) => parseInt(val, 10))
      this.boards[this.boards.length - 1].push(items);
      this.boardsMarks[this.boards.length -1].push(Array(items.length).fill(false));
    }
  }

  private markNumberOnCards(calledNumber){
    // search number in the boards
    for (let boardIndex = 0; boardIndex < this.boards.length; boardIndex += 1){
      const board = this.boards[boardIndex];

      for(let rowIndex = 0; rowIndex < board.length; rowIndex += 1){
        const row = board[rowIndex];

        // check if the called number exists in row
        const numberIndex = row.indexOf(calledNumber);
        if(numberIndex !== -1){
          // number was found, so mark it on the dots board
          this.boardsMarks[boardIndex][rowIndex][numberIndex] = true;
        }
      }
    }
  }

  private getWinningBoard(){
    for (let boardIndex = 0; boardIndex < this.boardsMarks.length; boardIndex += 1){
      const board = this.boardsMarks[boardIndex];

      // check Rows (easy part) & prepare cols Array
      for(let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
        const row = board[rowIndex];
        // check row
        if(row.filter((value) => value === false).length === 0){
          // found winning board
          return boardIndex;
        }

        // check colums with the same rowIndex
        const col: Array<boolean> = [];
        for(let colIndex = 0; colIndex < row.length; colIndex += 1){
          col.push(board[colIndex][rowIndex]);
        }

        if(col.filter((value) => value === false).length === 0){
          // found winning board
          return boardIndex;
        }
      }
    }
    return null;
  }

  private addUnmarkedNumbers(boardIndex) {
    let sum: number = 0;
    const board = this.boards[boardIndex];
    const markings = this.boardsMarks[boardIndex];

    for(let rowIndex = 0; rowIndex < markings.length; rowIndex += 1){
      const row = markings[rowIndex];
      for(let colIndex = 0; colIndex < row.length; colIndex += 1){
        const col = row[colIndex];
        if(col === false){
          sum += board[rowIndex][colIndex];
        }
      }
    }

    return sum;
  }

  solve(): number {
    // call the numbers
    for(let call of this.numbers){
      this.markNumberOnCards(call);
      let winningBoardIndex = this.getWinningBoard();
      if(winningBoardIndex !== null){
        return this.addUnmarkedNumbers(winningBoardIndex) * call;
      }
    }

    return null;
  }
}