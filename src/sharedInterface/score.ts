// Shared Interface used more then one time in the projects

export interface scoreObject {
	score: number,
	name: string,
}

export interface scoresArray extends Array<scoreObject> { }