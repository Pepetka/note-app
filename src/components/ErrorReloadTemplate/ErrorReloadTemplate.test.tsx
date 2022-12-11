import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ErrorReloadTemplate} from './ErrorReloadTemplate';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('ErrorReloadTemplate', () => {
	test('be in the document', () => {
		componentTestRender(<ErrorReloadTemplate/>);
		expect(screen.getByTestId('ErrorReloadTemplate')).toBeInTheDocument();
	});
});

