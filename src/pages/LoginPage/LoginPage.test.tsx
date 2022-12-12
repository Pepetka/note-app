import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('LoginPage', () => {
	test('be in the document', () => {
		componentTestRender(<LoginPage/>);
		expect(screen.getByTestId('LoginPage')).toBeInTheDocument();
		expect(screen.getByTestId('Login')).toBeInTheDocument();
	});
});
