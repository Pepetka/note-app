import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Login} from './Login';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('Login', () => {
	test('be in the document', () => {
		componentTestRender(<Login/>);
		expect(screen.getByTestId('Login')).toBeInTheDocument();
	});
});
