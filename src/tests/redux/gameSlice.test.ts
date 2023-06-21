import { gameSlice, setScore, setMaxScore, setSpeed, setGameOver, setMute } from '../../redux/gameSlice';

describe('Game Slice', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			score: 0,
			maxScore: 0,
			speed: 0,
			gameOver: false,
			mute: false
		};
	});

	test('should handle setScore', () => {
		const nextState = gameSlice.reducer(initialState, setScore(10));
		expect(nextState.score).toEqual(10);
	});

	test('should handle setMaxScore', () => {
		const nextState = gameSlice.reducer(initialState, setMaxScore(100));
		expect(nextState.maxScore).toEqual(100);
	});

	test('should handle setSpeed', () => {
		const nextState = gameSlice.reducer(initialState, setSpeed(5));
		expect(nextState.speed).toEqual(5);
	});

	test('should handle setGameOver', () => {
		const nextState = gameSlice.reducer(initialState, setGameOver(true));
		expect(nextState.gameOver).toEqual(true);
	});

	test('should handle setMute', () => {
		const nextState = gameSlice.reducer(initialState, setMute(true));
		expect(nextState.mute).toEqual(true);
	});
});
