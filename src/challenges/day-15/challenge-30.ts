import Day15 from './day-15';
import { Node } from './interfaces/Node';


export default class Challenge30 extends Day15 {

  createMap(): Node[][] {
    const repeat = 5;
    const map: Node[][] = [];

    for (let yMod = 0; yMod < repeat; yMod += 1) {
      for (let yIndex = 0; yIndex < this.input.length; yIndex += 1) {
        const y = yIndex + (this.input.length * yMod);

        let yDistance = y - this.input.length < 0 ? 0 : y - this.input.length;

        map[y] = [];

        for (let xMod = 0; xMod < repeat; xMod += 1) {
          for (let xIndex = 0; xIndex < this.input[0].length; xIndex += 1) {
            const x = xIndex + (this.input[0].length * xMod);
            let xDistance = x - this.input[0].length < 0 ? 0 : x - this.input[0].length;

            let distance: number;


            if (yMod === 0 && xMod === 0) {
              // first square
              distance = this.input[y][x];
            }
            if (yMod > 0 && xMod === 0) {
              distance = map[yDistance][x].distance + 1;
            }
            if (yMod === 0 && xMod > 0) {
              distance = map[y][xDistance].distance + 1;
            }
            if (yMod > 0 && xMod > 0) {
              distance = map[y][xDistance].distance + 1;
            }

            if (distance > 9) {
              distance = 1;
            }

            map[y][x] = {
              id: x.toString() + '-' + y.toString(),
              position: {
                x: x,
                y: y,
              },
              g: 0,
              h: 0,
              f: 0,
              distance,
              parent: null,
            };
          }
        }
      }
    }

    map[0][0].distance = 0;

    return map;
  }

  solve(): number {
    return super.solve();
  }
}
