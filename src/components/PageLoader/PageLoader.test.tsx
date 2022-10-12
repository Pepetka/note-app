import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {PageLoader} from './PageLoader';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('PageLoader', () => {
	test('be in the document', () => {
		componentTestRender(<PageLoader/>);
		expect(screen.getByTestId('PageLoader')).toBeInTheDocument();
	});
});
