import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import { Player } from '../../components';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';

describe("Player Component", () => {

	test('renders player with their accurate style ?', async () => {
		const setKeyPressedMock = jest.fn();

		const pixelSize: number = Math.floor(Math.random() * 40);
		const topPosition: number = Math.floor(Math.random() * 200);
		const leftPosition: number = Math.floor(Math.random() * 200);

		render(
			<Provider store={store}>
				<Player
					leftPosition={leftPosition}
					topPosition={topPosition}
					pixelSize={pixelSize}
					setKeyPressed={setKeyPressedMock}
					sound={"empty"}
				/>
			</Provider>
		);

		const PlayerImg = screen.getByRole('img');
		expect(PlayerImg).toBeInTheDocument();

		expect(PlayerImg).toHaveStyle({
			height: `${pixelSize}px`,
			width: `${pixelSize}px`,
			top: `${topPosition}px`,
			left: `${leftPosition}px`,
		});

		const user = userEvent.setup();

		await act(async() => {
			await user.keyboard('[ArrowUp]'); 
			await user.keyboard('[ArrowDown]'); 
		})

		expect(setKeyPressedMock).toHaveBeenCalledWith('Up');
		expect(setKeyPressedMock).toHaveBeenCalledWith('Down');
		expect(setKeyPressedMock).toHaveBeenCalledTimes(2);
		
	});
});

