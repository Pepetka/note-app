import {fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Textarea} from './Textarea';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('Textarea', () => {
	test('be in the document', () => {
		componentTestRender(<Textarea/>);
		expect(screen.getByTestId('Textarea')).toBeInTheDocument();
	});

	test('with corners', () => {
		componentTestRender(<Textarea withCorners/>);
		expect(screen.getByTestId('Textarea')).toHaveClass('withCorners');
	});

	test('float placeholder', async () => {
		componentTestRender(<Textarea floatPlaceholder='some placeholder'/>);
		expect(screen.getByTestId('Textarea_wrapper')).toHaveClass('withPlaceholder');
		expect(screen.getByTestId('Textarea_floatPlaceholder')).toBeInTheDocument();

		fireEvent.focus(screen.getByTestId('Textarea'));
		expect(screen.getByTestId('Textarea_floatPlaceholder')).toHaveClass('focused');

		fireEvent.blur(screen.getByTestId('Textarea'));
		expect(screen.getByTestId('Textarea_floatPlaceholder')).not.toHaveClass('focused');
	});
});
