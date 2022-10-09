import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import AboutPage from './AboutPage';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('AboutPage', () => {
	test('be in the document', () => {
		componentTestRender(<AboutPage/>);
		expect(screen.getByTestId('About')).toBeInTheDocument();
	});
});
