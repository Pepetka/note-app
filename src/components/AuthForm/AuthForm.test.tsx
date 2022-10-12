import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {AuthForm} from './AuthForm';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';

describe('AuthForm', () => {
	test('be in the document', () => {
		componentTestRender(<AuthForm title='' onSubmitForm={() => {}} />);
		expect(screen.getByTestId('AuthForm')).toBeInTheDocument();
	});

	test('error messages', async () => {
		componentTestRender(<AuthForm title='' onSubmitForm={() => {}} />);
		expect(screen.queryByTestId('AuthForm_emailError')).not.toBeInTheDocument();
		expect(screen.queryByTestId('AuthForm_passwordError')).not.toBeInTheDocument();
		await act(async () => userEvent.click(screen.getByTestId('AuthForm_btn')));
		setTimeout(() => {
			expect(screen.getByTestId('AuthForm_emailError')).toBeInTheDocument();
			expect(screen.getByTestId('AuthForm_passwordError')).toBeInTheDocument();
		});
	});
});
