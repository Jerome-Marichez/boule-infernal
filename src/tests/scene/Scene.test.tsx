import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import HighScore from '../../scene/HighScore';


describe('Score Scene', () => {

	const SceneRender = () => {
		render(
			<Provider store={store}>
				<HighScore />
			</Provider>
		)
	}

	test('"Score Player Input" is visible and ensure that only text can be entered when submitting the score', async() => {
		SceneRender();
		
		const player = await screen.findByRole('textbox') as HTMLInputElement;
		expect(player).toBeVisible(); 
		expect(player).toBeEnabled(); 

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