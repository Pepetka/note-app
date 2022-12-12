import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import AboutPage from './AboutPage';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('AboutPage', () => {
	test('be in the document', () => {
		componentTestRender(<AboutPage/>);
		expect(screen.getByTestId('AboutPage')).toBeInTheDocument();
		expect(screen.getByTestId('About')).toBeInTheDocument();
	});
});
