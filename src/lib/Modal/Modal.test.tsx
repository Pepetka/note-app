import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Modal} from './Modal';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('Modal', () => {
	test('be in the document', () => {
		componentTestRender(<Modal isOpen={true}>Modal Content</Modal>);
		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByText('Modal Content')).toBeInTheDocument();
	});

	test('close modal', () => {
		componentTestRender(<Modal isOpen={false}>Modal Content</Modal>);
		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByTestId('Modal')).toHaveClass('close');
	});
});
