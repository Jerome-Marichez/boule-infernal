import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

describe("App Test", () => {

	const AppRender = (): void => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		)
	}

	test("Game is visible", async () => {
		AppRender();
		
		const game = await screen.findByTestId('game');
		console.log(game);
		expect(game).toBeInTheDocument();
	})
})