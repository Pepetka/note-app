import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {DrawerConfirm} from './DrawerConfirm';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('DrawerConfirm', () => {
	test('be in the document', () => {
		componentTestRender(<DrawerConfirm isOpen={true} onConfirm={() => {}} onClose={() => {}}/>);
		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
		expect(screen.getByTestId('DeleteNoteConfirm')).toBeInTheDocument();
	});
});
