import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen, render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MusicLoop } from '../../components';

describe('MusicLoop component', () => {

	test('renders audio after user interaction (arrow key press)', async () => {
		render(<MusicLoop music="gameover" mute={true} />);

		let audioTag: HTMLElement | null = screen.queryByTestId('audio');
		expect(audioTag).toBeNull();

		const user = userEvent.setup();

		await act(async () => {
			await user.keyboard('[ArrowUp]');
			await user.keyboard('[ArrowDown]');
		});

		audioTag = await screen.findByTestId('audio');
		const sourceElement: HTMLElement = await screen.findByTestId('source');

		expect(audioTag).toBeInTheDocument();
		expect(sourceElement).toHaveAttribute(
			'src',
			expect.stringContaining('gameover.mp3')
		);
	});
});
