import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {About} from './About';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('About', () => {
	test('be in the document', () => {
		componentTestRender(<About version='v1.0.0'/>);
		expect(screen.getByTestId('About')).toBeInTheDocument();
		expect(screen.getByText('v1.0.0')).toBeInTheDocument();
	});
});
