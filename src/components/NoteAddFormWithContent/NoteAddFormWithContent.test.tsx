import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {NoteAddFormWithContent} from './NoteAddFormWithContent';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';
import userEvent from '@testing-library/user-event';

describe('NoteAddFormWithContent', () => {
	test('be in the document', () => {
		componentTestRender(<NoteAddFormWithContent/>);
		expect(screen.getByTestId('NoteAddFormWithContent')).toBeInTheDocument();
	});

	test('error', async () => {
		componentTestRender(<NoteAddFormWithContent/>);
		expect(screen.queryByTestId('NoteAddFormWithContent_error')).not.toBeInTheDocument();

		await userEvent.click(screen.getByTestId('NoteAddFormWithContent_btn'));

		expect(screen.getByTestId('NoteAddFormWithContent_error')).toBeInTheDocument();
	});
});
