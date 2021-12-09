import Day09 from './day-09';

export default class Challenge17 extends Day09 {

  solve(): number {
    const deepestPoints = this.getDeepestPointsCoords();
    let sumOfLowPoints = 0;

    for (let point of deepestPoints) {
      sumOfLowPoints += this.input[point.y][point.x] + 1;
    }

    return sumOfLowPoints;
  }
}
