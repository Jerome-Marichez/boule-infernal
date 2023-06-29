import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { myMapMock } from './mapMock';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Game from '../../scene/Game';

describe('Game Scene', () => {

	/**
	 * A function that renders the Game Scene with the provided store
	 */
	const GameRender = (): void => {
		render(
			<Provider store={store}>
				<Game heightGame={500} widthGame={300} map={myMapMock} speed={0.5} key={0.5} />
			</Provider>
		)
	}

	test('Game is displaying all blocks right', async () => {
		GameRender();

		let blockWall = 0;
		let blockGoal = 0;
		let player = 0;

		const image = await screen.findAllByRole('img');
		image.forEach((value) => {
			switch (value.className) {

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

		expect(blockGoal).toEqual(myMapMock.numberGoal)
		expect(blockWall).toEqual(myMapMock.numberWall);
		expect(player).toEqual(1);
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

	test('Player move when a key is pressed', async () => {
		GameRender();

		const playerIndexOld = await findPlayer('player');
		const user = userEvent.setup();

		await act(async () => {
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowDown]');
		});

		const playerIndex = await findPlayer('player');
		expect(playerIndex).not.toEqual(playerIndexOld);
	})

})