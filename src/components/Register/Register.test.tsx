import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Register} from './Register';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('Register', () => {
	test('be in the document', () => {
		componentTestRender(<Register/>);
		expect(screen.getByTestId('Register')).toBeInTheDocument();
	});
});
