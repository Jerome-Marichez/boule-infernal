import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import HighScore from '../../scene/HighScore';


describe('HighScore Scene', () => {


	const SceneRender = () => {
		render(
			<Provider store={store}>
				<HighScore />
			</Provider>
		)
	}

	test('Scores Name are visible', async () => {
		SceneRender();

		const names: Array<HTMLDivElement> = await screen.findAllByTestId('name');
		names.forEach((name) => {
			console.log(name.innerHTML.length)
			expect(name.innerHTML.length <= 10).toBeTruthy();
		})
		expect(names.length).toBe(15);
	})

	test('Scores are sorted by DESC', async () => {
		SceneRender();

		const scores: Array<HTMLDivElement> = await screen.findAllByTestId('score');
		const scoresValues = scores.map((score) => {
			return Number(score.innerHTML)
		})
		const sortedScores = scoresValues.sort((a, b) => a - b);
		expect(sortedScores).toEqual(scoresValues);
	})

	test('# Elements are visible', async () => {
		SceneRender();
		const elements: Array<HTMLDivElement> = await screen.findAllByText("#");
		expect(elements.length).toBeGreaterThan(45);
	})

	test('"Score Player Input" is visible and ensure that only text can be entered when submitting the score', async () => {
		SceneRender();

		const player = await screen.findByRole('textbox') as HTMLInputElement;
		expect(player).toBeVisible();
		expect(player).toBeEnabled();
		expect(player).toHaveDisplayValue('Name');

		const user = userEvent.setup();

		await act(async () => {
			await user.keyboard('[Backspace]');
			await user.keyboard('[Backspace]');
			await user.keyboard('[Backspace]');
			await user.keyboard('[Backspace]');
			await user.keyboard('0');
			await user.keyboard('🍋');
			await user.keyboard('*');
		});
		expect(player.value).toBe('');

		await act(async () => {
			await user.keyboard('J');
			await user.keyboard('e');
			await user.keyboard('s');
			await user.keyboard('t');
		});
		expect(player.value).toBe('Jest');

		// after pressing ENTER score is submit and then u can't modify name
		await act(async () => {
			await user.keyboard('[ENTER]');
		});
		await act(async () => {
			await user.keyboard('t');
		});

		expect(player.value).toBe('Jest');

	})
})