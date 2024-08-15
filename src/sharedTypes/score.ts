// Shared Interface used more then one time in the projects

export interface ScoreObject {
	id?: number,
	name: string,
	score: number,
}

export type Scores = Array<ScoreObject>