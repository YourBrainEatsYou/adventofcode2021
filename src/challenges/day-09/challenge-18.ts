import Day09 from './day-09';
import Point from './interfaces/point';

export default class Challenge18 extends Day09 {

  pointToId(point: Point): string {
    return point.x.toString() + '-' + point.y.toString();
  }

  idToPoint(id: string): Point {
    const idParts = id.split('-');
    return {
      x: parseInt(idParts[0]),
      y: parseInt(idParts[1]),
    } as Point;
  }

  calculateBasinSize(point: Point): number {
    let sourcePoints: Array<Point> = [point];
    let pointsWereSourcePoint: Array<string> = [];

    while (sourcePoints.length > 0) {
      const sourcePointsSnapshot = [...sourcePoints];
      const newSourcePoints: Array<string> = [];
      for (let sourcePoint of sourcePointsSnapshot) {
        pointsWereSourcePoint.push(this.pointToId(sourcePoint));

        // add new SourcePoints
        const up = this.up(sourcePoint.x, sourcePoint.y) !== null ? this.up(sourcePoint.x, sourcePoint.y) : 10;
        const down = this.down(sourcePoint.x, sourcePoint.y) !== null ? this.down(sourcePoint.x, sourcePoint.y) : 10;
        const left = this.left(sourcePoint.x, sourcePoint.y) !== null ? this.left(sourcePoint.x, sourcePoint.y) : 10;
        const right = this.right(sourcePoint.x, sourcePoint.y) !== null ? this.right(sourcePoint.x, sourcePoint.y) : 10;

        // up
        if (up < 9) {
          const upPoint = { x: sourcePoint.x, y: sourcePoint.y - 1 };
          if (!pointsWereSourcePoint.includes(this.pointToId(upPoint))) {
            newSourcePoints.push(this.pointToId(upPoint));
          }
        }
        // down
        if (down < 9) {
          const downPoint = { x: sourcePoint.x, y: sourcePoint.y + 1 };
          if (!pointsWereSourcePoint.includes(this.pointToId(downPoint))) {
            newSourcePoints.push(this.pointToId(downPoint));
          }
        }
        // left
        if (left < 9) {
          const leftPoint = { x: sourcePoint.x - 1, y: sourcePoint.y };
          if (!pointsWereSourcePoint.includes(this.pointToId(leftPoint))) {
            newSourcePoints.push(this.pointToId(leftPoint));
          }
        }
        // right
        if (right < 9) {
          const rightPoint = { x: sourcePoint.x + 1, y: sourcePoint.y };
          if (!pointsWereSourcePoint.includes(this.pointToId(rightPoint))) {
            newSourcePoints.push(this.pointToId(rightPoint));
          }
        }
      }
      sourcePoints = Array.from(new Set(newSourcePoints)).map((id) => this.idToPoint(id));
    }

    return pointsWereSourcePoint.length;
  }


  solve(): number {
    const deepestPoints = this.getDeepestPointsCoords();
    const basinSizes = [];

    for (let point of deepestPoints) {
      basinSizes.push(this.calculateBasinSize(point));
    }

    basinSizes.sort((a, b) => a - b).reverse();

    return basinSizes[0] * basinSizes[1] * basinSizes[2];
  }
}
