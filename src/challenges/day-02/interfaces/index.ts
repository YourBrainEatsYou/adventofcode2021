export type CommandType = 'forward' | 'down' | 'up';

export interface Command {
  type: CommandType,
  times: number
}

export interface Position {
  horizontal: number,
  depth: number,
  aim?: number
}