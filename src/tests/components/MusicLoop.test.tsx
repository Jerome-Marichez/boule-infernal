import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MusicLoop } from '../../components';

describe('MusicLoop component', () => {

	test('renders audio after user interaction (arrow key press)', async () => {
		const { rerender } = render(
			<MusicLoop music="gameover" mute={true} />
		);
		
		let audioTag: HTMLElement | null = screen.queryByTestId('audio');
		expect(audioTag).toBeNull();

		fireEvent.keyDown(window, { key: 'ArrowUp' });

		rerender(<MusicLoop music="gameover" mute={true} />);
		audioTag = await screen.findByTestId('audio');
		const sourceElement: HTMLElement = await screen.findByTestId('source');

		expect(audioTag).toBeInTheDocument();
		expect(sourceElement).toHaveAttribute(
			'src',
			expect.stringContaining('gameover.mp3')
		);
	});
});
