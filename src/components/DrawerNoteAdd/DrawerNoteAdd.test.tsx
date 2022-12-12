import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {DrawerNoteAdd} from './DrawerNoteAdd';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('DrawerNoteAdd', () => {
	test('be in the document', () => {
		componentTestRender(<DrawerNoteAdd isOpen={true} onClose={() => {}}/>);
		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
		expect(screen.getByTestId('NoteAddFormWithContent')).toBeInTheDocument();
	});
});
