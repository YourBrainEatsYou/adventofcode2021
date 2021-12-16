export interface Coordinates {
  x: number;
  y: number;
}

export interface Node {
  id: string; // x + y
  position: Coordinates;
  g: number | null; // current costs to this node
  h: number | null; // heuristic | manhattan distance to final node
  f: number | null; // calculatedCosts g + h
  distance: number; // distance |how many chitons are on that node
  parent: Node | null;
}
