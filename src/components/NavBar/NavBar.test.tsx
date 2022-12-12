import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {NavBar} from './NavBar';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';
import {StateSchema} from '../../store/model/types/StateSchema';

describe('NavBar', () => {
	test('be in the document', () => {
		componentTestRender(<NavBar/>);
		expect(screen.getByTestId('NavBar')).toBeInTheDocument();
	});

	test('before auth', () => {
		componentTestRender(<NavBar/>);
		expect(screen.getByTestId('NavBar_login')).toBeInTheDocument();
	});

	test('after auth', () => {
		const state: DeepPartial<StateSchema> = {
			user: {
				user: {
					email: '',
					token: '',
					id: '',
				},
			},
		};

		componentTestRender(<NavBar/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('NavBar_logout')).toBeInTheDocument();
	});

	test('home link active', () => {
		componentTestRender(<NavBar/>, {route: '/'});
		expect(screen.getByTestId('NavBar_home')).toHaveClass('active');
	});

	test('about link active', () => {
		componentTestRender(<NavBar/>, {route: '/about'});
		expect(screen.getByTestId('NavBar_about')).toHaveClass('active');
	});

	test('login link active', () => {
		componentTestRender(<NavBar/>, {route: '/login'});
		expect(screen.getByTestId('NavBar_login')).toHaveClass('active');
	});
});
