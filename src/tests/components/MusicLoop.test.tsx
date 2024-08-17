import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen, render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MusicLoop } from '../../components';

describe('MusicLoop component', () => {

	test('no render without interaction but empty fragment is here', async () => {
		render(<MusicLoop music="gameover" mute={true} />);
		let audioTag: HTMLElement | null = screen.queryByTestId('audio');
		expect(audioTag).toBeNull();

		const empty = screen.getByTestId("empty");
		expect(empty).toBeInTheDocument();
	})

	test('render after user interaction (arrow key press)', async () => {
		render(<MusicLoop music="gameover" mute={true} />);

		let audioTag: HTMLElement | null = screen.queryByTestId('audio');
		expect(audioTag).toBeNull();

		const user = userEvent.setup();
		await act(async () => {
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowDown]');
		});

		const sourceElement: HTMLElement = await screen.findByTestId('source');
		expect(sourceElement).toHaveAttribute(
			'src',
			expect.stringContaining('gameover.mp3')
		);
	});

	test('Does it call setInteraction when arrow key is pressed ?', async () => {
		const setInteractionMock = jest.fn();
		jest.spyOn(React, 'useState').mockReturnValueOnce([false, setInteractionMock]);

		render(<MusicLoop music="gameover" mute={true} />);

		const user = userEvent.setup();
		await act(async () => {
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowDown]');
		});

		expect(setInteractionMock).toHaveBeenCalledTimes(2);
	})
});
