export interface Cave {
  id: string,
  isBig: boolean,
  isStart: boolean,
  isEnd: boolean,
  connections: string[],
  nextCaveIndexToExplore: number,
}
