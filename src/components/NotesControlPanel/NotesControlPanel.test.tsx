import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {NotesControlPanel} from './NotesControlPanel';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';
import userEvent from '@testing-library/user-event';

describe('NotesControlPanel', () => {
	test('be in the document', () => {
		componentTestRender(<NotesControlPanel notesLength={10}/>);
		expect(screen.getByTestId('NotesControlPanel')).toBeInTheDocument();
		expect(screen.getByText('10')).toBeInTheDocument();
	});

	test('handle sort', async () => {
		componentTestRender(<NotesControlPanel notesLength={10}/>);
		expect(screen.getByTestId('Switcher')).not.toHaveClass('active');

		await userEvent.click(screen.getByTestId('NotesControlPanel_label'));

		expect(screen.getByTestId('Switcher')).toHaveClass('active');
	});
});
