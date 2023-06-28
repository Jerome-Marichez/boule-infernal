
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Score from '../../components/Score/Score';

describe('Score Component', () => {
	test('Render score as inactive component if isActualPlayer is false', () => {
		render(<Score name={'test'} score={50} isItActualPlayer={false} />);
		const inactiveComponent = screen.getByTestId('name');
		expect(inactiveComponent).toBeInTheDocument();
		expect(inactiveComponent).toBeVisible();
	});

	test('Render score as active component if isActualPlayer is true', async () => {
		render(<Score name={'test'} score={50} isItActualPlayer={true} />);
		const activeComponent = await screen.findByRole('textbox');
		expect(activeComponent).toBeInTheDocument();
		expect(activeComponent).toBeVisible();
	});
});
