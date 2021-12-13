import { FileReader } from '../../utils';
import { Challenge } from '../../utils/Challenge';
import { Cave } from './interfaces/Cave';


export default class Challenge23 implements Challenge {

  START = 'start';
  END = 'end';

  readonly input: [string, string][] = new FileReader(12)
    .getFileAsArray()
    .filter((line) => line !== '')
    .map((line) => line.split('-').filter((line) => line !== '') as [string, string]);

  private caves: { ids: string[], entities: Cave[] } = {
    ids: [],
    entities: [],
  };

  private possiblePaths = [];

  constructor() {
    // create Caves
    const uniqueInput = [...Array.from(new Set(this.input.flat(2)))];

    for (let index = 0; index < uniqueInput.length; index += 1) {
      let id = uniqueInput[index];

      let uppercaseId = id.toUpperCase();

      let cave: Cave = {
        id,
        isBig: (id === uppercaseId),
        isStart: (id === this.START),
        isEnd: (id === this.END),
        connections: [],
        nextCaveIndexToExplore: 0,
      };

      this.caves.ids.push(id);
      this.caves.entities.push(cave);
    }

    // add Cave Connections
    for (let index = 0; index < this.input.length; index += 1) {
      let [cave1, cave2] = this.input[index];

      this.caves.entities[this.caves.ids.indexOf(cave1)].connections.push(cave2);
      this.caves.entities[this.caves.ids.indexOf(cave2)].connections.push(cave1);
    }
  }


  canVisitCave(cave: Cave, exploredCaves: string[]) {
    if (!cave.isBig) {
      if (exploredCaves.includes(cave.id)) {
        return false;
      }
    }
    return true;
  }

  getChildRoutes(cave: Cave, trace) {
    trace = [...trace, cave.id];
    if (cave.id !== this.END) {
      const filteredConnections = cave.connections.filter((id) => id !== this.START);
      for (let id of filteredConnections) {
        const nextCave = this.caves.entities[this.caves.ids.indexOf(id)];
        if (this.canVisitCave(nextCave, trace)) {
          this.getChildRoutes(nextCave, trace);
        }
      }
    } else {
      this.possiblePaths.push(trace);
    }
  }

  solve(): number {
    this.getChildRoutes(this.caves.entities[this.caves.ids.indexOf(this.START)], []);
    return this.possiblePaths.length;
  }

}
