import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Input} from './Input';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('Input', () => {
	test('be in the document', () => {
		componentTestRender(<Input/>);
		expect(screen.getByTestId('Input')).toBeInTheDocument();
	});

	test('with corners', () => {
		componentTestRender(<Input withCorners/>);
		expect(screen.getByTestId('Input')).toHaveClass('withCorners');
	});
});
