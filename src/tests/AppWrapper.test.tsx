import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AppWraper from '../AppWrapper';

describe("AppWrapper Test", () => {
	test("Something is displayed", async () => {
		const { container } = render(
			<Provider store={store} >
				<AppWraper />
			</Provider>
		)

		let somethingIsDisplay = false;
		if (container.innerHTML.length > 200) somethingIsDisplay = true;
		expect(somethingIsDisplay).toBeTruthy();
	})
})