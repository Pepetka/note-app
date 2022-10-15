import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {NoteAddButton} from './NoteAddButton';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('NoteAddButton', () => {
	test('be in the document', () => {
		componentTestRender(<NoteAddButton onClick={() => {}}/>);
		expect(screen.getByTestId('NoteAddButton')).toBeInTheDocument();
	});
});
