import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ModalConfirm} from './ModalConfirm';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('ModalConfirm', () => {
	test('be in the document', () => {
		componentTestRender(<ModalConfirm isOpen={true} onConfirm={() => {}} onClose={() => {}}/>);
		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByTestId('DeleteNoteConfirm')).toBeInTheDocument();
	});
});
