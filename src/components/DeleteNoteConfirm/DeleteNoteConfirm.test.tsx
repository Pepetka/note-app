import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {DeleteNoteConfirm} from './DeleteNoteConfirm';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('DeleteNoteConfirm', () => {
	test('be in the document', () => {
		componentTestRender(<DeleteNoteConfirm onConfirm={() => {}} onClose={() => {}}/>);
		expect(screen.getByTestId('DeleteNoteConfirm')).toBeInTheDocument();
	});
});
