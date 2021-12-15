import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';

interface Coordinates {
  x: number;
  y: number;
}

interface Node {
  id: string; // x + y
  position: Coordinates;
  g: number | null; // current costs to this node
  h: number | null; // heuristic | manhattan distance to final node
  f: number | null; // calculatedCosts g + h
  distance: number; // distance |how many chitons are on that node
  parent: Node | null;
}

const neighbourList = [
  [0, -1], // top
  [1, 0], // right
  [0, 1], // bottom
  [-1, 0], // left
];


export default class Challenge29 implements Challenge {

  readonly input: number[][] = new FileReader(15)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split('')
      .map((chitons) => parseInt(chitons, 10)),
    );

  private map: Node[][] = [];

  constructor() {
    for (let yIndex = 0; yIndex < this.input.length; yIndex += 1) {
      this.map[yIndex] = [];
      for (let xIndex = 0; xIndex < this.input[0].length; xIndex += 1) {
        this.map[yIndex][xIndex] = {
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
  }

  private static idToCoords(id: string): Coordinates {
    const coordArray = id.split('-');
    return {
      x: parseInt(coordArray[0], 10),
      y: parseInt(coordArray[1], 10),
    };
  }

  private static calculateManhattanDistance(start: Coordinates, end: Coordinates): number {
    return Math.abs(start.x - end.x) + Math.abs(start.y + end.y);
  }

  solve(): number {
    const start = this.map[0][0];
    const end = this.map[this.map.length - 1][this.map[0].length - 1];

    let winningNode: Node;
    let openList = [start.id];
    let closedList: string[] = [];


    while (openList.length > 0) {
      let lowestIndex = 0;

      for (let index = 0; index < openList.length; index++) {
        if (this.getNodeWithId(openList[index]).f < this.getNodeWithId(openList[lowestIndex]).f) {
          lowestIndex = index;
        }
      }

      let currentNode = this.getNodeWithId(openList[lowestIndex]);

      // reached finish
      if (currentNode.id === end.id) {
        winningNode = currentNode;
        break;
      }

      // move currentNode from open to close and inspect its neighbours
      openList.splice(lowestIndex, 1);
      closedList.push(currentNode.id);

      // getNeighbours
      const neighbours = this.getNeighbours(currentNode);

      for (let nIndex = 0; nIndex < neighbours.length; nIndex += 1) {
        let neighbour = neighbours[nIndex];

        if (closedList.includes(neighbour.id)) {
          continue; // this node was already observed
        }

        const gScore = currentNode.g + neighbour.distance; // add the current distance to the parents distance
        let bestGScore = false;

        if (!openList.includes(neighbour.id)) {
          // calculate heuristic score
          bestGScore = true;
          neighbour.h = Challenge29.calculateManhattanDistance(neighbour.position, end.position);
          openList.push(neighbour.id);
        } else if (gScore < neighbour.g) {
          bestGScore = true;
        }

        if (bestGScore) {
          neighbour.parent = currentNode;
          neighbour.g = gScore;
          neighbour.f = neighbour.g + neighbour.h;
        }
      }
    }

    let riskLevel = null;
    /*if (winningNode){
      let node = winningNode
      while(node.parent) {
        node = node.parent;
      }
    }*/
    if (winningNode) {
      riskLevel = winningNode.g;
    }

    return riskLevel;
  }

  private getNodeWithId(id: string): Node {
    const coords = Challenge29.idToCoords(id);
    return this.map[coords.y][coords.x];
  }

  private getNeighbours(node: Node): Node[] {
    const neighbours = [];

    for (let modifier of neighbourList) {
      if (this.map[node.position.y + modifier[1]] && this.map[node.position.y + modifier[1]][node.position.x + modifier[0]]) {
        neighbours.push(this.map[node.position.y + modifier[1]][node.position.x + modifier[0]]);
      }
    }

    return neighbours;
  }
}
