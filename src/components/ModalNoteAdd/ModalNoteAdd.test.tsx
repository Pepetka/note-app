import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ModalNoteAdd} from './ModalNoteAdd';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('ModalNoteAdd', () => {
	test('be in the document', () => {
		componentTestRender(<ModalNoteAdd isOpen={true} onClose={() => {}}/>);
		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByTestId('NoteAddFormWithContent')).toBeInTheDocument();
	});
});
