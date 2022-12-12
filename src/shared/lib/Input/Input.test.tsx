import {fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Input} from './Input';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('Input', () => {
	test('be in the document', () => {
		componentTestRender(<Input/>);
		expect(screen.getByTestId('Input')).toBeInTheDocument();
	});

	test('with corners', () => {
		componentTestRender(<Input withCorners/>);
		expect(screen.getByTestId('Input')).toHaveClass('withCorners');
	});

	test('float placeholder', async () => {
		componentTestRender(<Input floatPlaceholder='some placeholder'/>);
		expect(screen.getByTestId('Input_wrapper')).toHaveClass('withPlaceholder');
		expect(screen.getByTestId('Input_floatPlaceholder')).toBeInTheDocument();

		fireEvent.focus(screen.getByTestId('Input'));
		expect(screen.getByTestId('Input_floatPlaceholder')).toHaveClass('focused');

		fireEvent.blur(screen.getByTestId('Input'));
		expect(screen.getByTestId('Input_floatPlaceholder')).not.toHaveClass('focused');
	});
});
