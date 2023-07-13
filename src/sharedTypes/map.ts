export type Level = Array<0 | 1 | 2 | 3 | 4>

export interface Map {
	level: Level,
	numberWall: number,
	numberGoal: number
}
