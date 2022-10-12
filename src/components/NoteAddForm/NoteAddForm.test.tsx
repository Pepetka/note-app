import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {NoteAddForm} from './NoteAddForm';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';
import userEvent from '@testing-library/user-event';
import {Alert} from '../Alert/Alert';

describe('NoteAddForm', () => {
	test('be in the document', () => {
		componentTestRender(<NoteAddForm/>);
		expect(screen.getByTestId('NoteAddForm')).toBeInTheDocument();
	});

	test('show alert', async () => {
		componentTestRender(<>
			<Alert/>
			<NoteAddForm/>
		</>);
		expect(screen.queryByTestId('Alert')).not.toBeInTheDocument();

		await userEvent.click(screen.getByTestId('NoteAddForm_btn'));

		expect(screen.getByTestId('Alert')).toBeInTheDocument();
	});
});
