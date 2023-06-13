import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialStates';
import { gameState } from './initialStates';

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes

		setScore: (state: gameState, action: PayloadAction<number>) => {
			state.score = action.payload;
		},

		setMaxScore: (state: gameState, action: PayloadAction<number>) => {
			state.maxScore = action.payload;
		},

		setSpeed: (state: gameState, action: PayloadAction<number>) => {
			state.speed = action.payload;
		},

		setGameOver: (state: gameState, action: PayloadAction<boolean>) => {
			state.gameOver = action.payload;
		},

		setMute: (state: gameState, action: PayloadAction<boolean>) => {
			state.mute = action.payload; 
		}
	},
});



// Action creators are generated for each case reducer function
export const { setScore, setMaxScore, setSpeed, setGameOver, setMute } = gameSlice.actions;

export default gameSlice.reducer;