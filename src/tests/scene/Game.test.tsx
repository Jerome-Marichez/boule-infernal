import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import { Map } from '../../sharedTypes/map';
import { goodMapMock, badMapMock } from '../mock/mapMock';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Game from '../../scene/Game';

describe('Game Scene', () => {

	/**
	 * A function that renders the Game Scene with the provided store
	 */
	const GameRender = (map: Map): void => {
		render(
			<Provider store={store}>
				<Game heightGame={500} widthGame={300} map={goodMapMock} speed={0.5} key={0.5} />
			</Provider>
		)
	}

	test('Game is stylized with its props', async () => {
		GameRender(goodMapMock);
		const game = await screen.findByTestId('game');
		expect(game).toHaveStyle({
			height: `500px`,
			width: `300px`,
		});
	})

	test('Game is displaying all blocks right', async () => {
		GameRender(goodMapMock);

		let blockWall = 0;
		let blockGoal = 0;
		let blockGreen = 0;
		let blockEmpty = 0;
		let player = 0;


		const image = await screen.findAllByRole('img');
		image.forEach((value) => {
			switch (value.className) {
				case 'block empty':
					blockEmpty += 1;
					break;
				case 'block green':
					blockGreen += 1;
					break;
				case 'block wall':
					blockWall += 1;
					break;
				case 'block goal':
					blockGoal += 1;
					break;
				case 'player':
					player += 1;
					break;
				default:
					break;
			}
		})

		const totalBlock = blockGoal + blockGreen + player + blockWall;

		expect(blockGoal).toEqual(goodMapMock.numberGoal)
		expect(blockWall).toEqual(goodMapMock.numberWall);
		expect(blockGreen).toBeGreaterThan(15);
		expect(player).toEqual(1);
		expect(blockEmpty).toEqual(goodMapMock.level.length - totalBlock);
	})


	/**
	 * Retrieves the index in the array that holds the map of the Game Scene for a component with the given className.
	 * @param The className of the component <Player/>
	 * @returns A promise that resolves to the index in the array
	 */
	const findPlayer = async (className: string): Promise<number> => {
		const image = await screen.findAllByRole('img');
		let playerIndexOld = 0;
		image.forEach((value, index) => {
			if (value.className === className) {
				playerIndexOld = index;
			}
		})
		return playerIndexOld;
	}

	test('Sound Control is visible', async () => {
		GameRender(goodMapMock);

		const soundControlComponent = await screen.findByText('Sound Off 🔇');
		expect(soundControlComponent).toBeVisible();
	})

	test('Player move when a key is pressed', async () => {
		GameRender(goodMapMock);

		const playerIndexOld = await findPlayer('player');
		const user = userEvent.setup();

		await act(async () => {
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowDown]');
		});
		await new Promise((r) => setTimeout(r, 190));

		const playerIndex = await findPlayer('player');
		expect(playerIndex).not.toEqual(playerIndexOld);
		expect(playerIndex).toBeGreaterThan(playerIndexOld);

		const movePlayer: number = playerIndex - playerIndexOld;
		console.log(movePlayer);
		expect(movePlayer).toBeGreaterThanOrEqual(17);
		expect(movePlayer).toBeLessThanOrEqual(23);
	})


	test('Player dead if he hit a Wall', async () => {
		GameRender(badMapMock);

		const playerIndexOld = await findPlayer('player');
		expect(playerIndexOld).toBeTruthy();
		const user = userEvent.setup();

		await act(async () => {
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowUp]');
			await setTimeout(() => { }, 2000);
		});

		setTimeout(async () => {
			const playerIndex = await findPlayer('player');
			expect(playerIndex).toBeFalsy();
		}, 2000)


	})



})