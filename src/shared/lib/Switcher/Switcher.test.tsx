import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Switcher} from './Switcher';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('Switcher', () => {
	test('be in the document', () => {
		componentTestRender(<Switcher/>);
		expect(screen.getByTestId('Switcher')).toBeInTheDocument();
	});

	test('not active', () => {
		componentTestRender(<Switcher/>);
		expect(screen.getByTestId('Switcher')).not.toHaveClass('active');
	});

	test('active', () => {
		componentTestRender(<Switcher isActive/>);
		expect(screen.getByTestId('Switcher')).toHaveClass('active');
	});
});
