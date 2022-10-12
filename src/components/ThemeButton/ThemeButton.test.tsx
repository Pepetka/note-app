import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {ThemeButton} from './ThemeButton';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('ThemeButton', () => {
	test('be in the document', () => {
		componentTestRender(<ThemeButton/>);
		expect(screen.getByTestId('ThemeButton')).toBeInTheDocument();
	});

	test('toggle', () => {
		componentTestRender(<ThemeButton/>);
		expect(screen.getByTestId('ThemeButton_moon')).toBeInTheDocument();
		expect(screen.queryByTestId('ThemeButton_sun')).not.toBeInTheDocument();

		userEvent.click(screen.getByTestId('ThemeButton'));

		expect(screen.queryByTestId('ThemeButton_moon')).not.toBeInTheDocument();
		expect(screen.getByTestId('ThemeButton_sun')).toBeInTheDocument();
	});
});
