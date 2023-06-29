// Shared Interface used more then one time in the projects

export interface ScoreObject {
	score: number,
	name: string,
}

export type Scores = Array<ScoreObject>