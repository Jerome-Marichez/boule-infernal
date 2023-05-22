import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

export const store = configureStore({
	reducer: {
		gameState: gameReducer,
	},

});


export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch