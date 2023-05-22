export interface gameState {
	score: number,
	maxScore: number,
	gameOver: boolean, 
	speed: number, 
}

export const initialState: gameState = {
	score: 0,
	maxScore: 0,
	gameOver: false,
	speed: 50,  
};