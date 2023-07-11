export interface gameState {
	score: number,
	maxScore: number,
	gameOver: boolean, 
	speed: number, 
	mute: boolean, 
}

export const initialState: gameState = {
	score: 0,
	maxScore: 0,
	gameOver: false,
	speed: 70,  
	mute: true,
};