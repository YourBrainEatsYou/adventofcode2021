import Day15 from './day-15';
import { Node } from './interfaces/Node';


export default class Challenge30 extends Day15 {

  createMap(): Node[][] {
    const map = [];

    for (let yIndex = 0; yIndex < this.input.length; yIndex += 1) {
      map[yIndex] = [];
      for (let xIndex = 0; xIndex < this.input[0].length; xIndex += 1) {
        map[yIndex][xIndex] = {
          id: xIndex.toString() + '-' + yIndex.toString(),
          position: {
            x: xIndex,
            y: yIndex,
          },
          g: 0,
          h: 0,
          f: 0,
          distance: yIndex === 0 && xIndex === 0 ? 0 : this.input[yIndex][xIndex],
          parent: null,
        };
      }
    }
    return map;
  }
}
