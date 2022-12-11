import {act, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {NoteAddButton} from './NoteAddButton';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('NoteAddButton', () => {
	test('be in the document', () => {
		componentTestRender(<NoteAddButton />);
		expect(screen.getByTestId('NoteAddButton')).toBeInTheDocument();
	});

	test('open modal', async () => {
		componentTestRender(<NoteAddButton />);
		expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();

		await act(async () => {
			userEvent.click(screen.getByTestId('NoteAddButton'));
		});

		expect(screen.getByTestId('Modal')).toBeInTheDocument();
	});
});
