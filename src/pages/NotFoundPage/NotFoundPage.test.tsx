import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from './NotFoundPage';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('NotFoundPage', () => {
	test('be in the document', () => {
		componentTestRender(<NotFoundPage/>);
		expect(screen.getByTestId('NotFoundPage')).toBeInTheDocument();
	});
});
