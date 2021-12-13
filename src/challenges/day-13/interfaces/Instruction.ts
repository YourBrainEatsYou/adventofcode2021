type Direction = 'x' | 'y'

export interface Instruction {
  direction: Direction,
  position: number,
}
