import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { SoundControl } from '../../components';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('Sound Control Component', () => {

	const SoundControlRender = (): void => {
		render(
			<Provider store={store}>
				<SoundControl />
			</Provider>
		)
	}

	test('Component is visible and we can switch menu settings Off/On', async () => {
		SoundControlRender();

		const soundComponent: HTMLElement = await screen.findByText('Sound Off 🔇');
		expect(soundComponent).toBeVisible();

		userEvent.click(soundComponent);
		const soundComponentUpdate: HTMLElement = await screen.findByText('Sound On 🔊');
		expect(soundComponentUpdate).toBeVisible();

		userEvent.click(soundComponentUpdate);
		expect(soundComponent).toBeVisible();
	});

})