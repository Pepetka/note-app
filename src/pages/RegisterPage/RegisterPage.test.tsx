import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from './RegisterPage';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('RegisterPage', () => {
	test('be in the document', () => {
		componentTestRender(<RegisterPage/>);
		expect(screen.getByTestId('RegisterPage')).toBeInTheDocument();
		expect(screen.getByTestId('Register')).toBeInTheDocument();
	});
});
