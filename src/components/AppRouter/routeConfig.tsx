import {RouteProps} from 'react-router-dom';
import {HomePage} from 'pages/HomePage/HomePage';
import {AboutPageLazy} from 'pages/AboutPage/AboutPage.lazy';
import {LoginPageLazy} from 'pages/LoginPage/LoginPage.lazy';
import {RegisterPageLazy} from 'pages/RegisterPage/RegisterPage.lazy';
import {NotFoundPageLazy} from 'pages/NotFoundPage/NotFoundPage.lazy';

export interface RoutePropsAuth extends RouteProps{
	authOnly?: boolean
	noAuthOnly?: boolean
}

const enum AppRoutes {
	HOME = 'home',
	ABOUT = 'about',
	LOGIN = 'login',
	REGISTER = 'register',
	NOT_FOUND = 'not_found'
}

export const routePaths: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.REGISTER]: '/register',
	[AppRoutes.NOT_FOUND]: '*',

};

export const routeConfig: Record<AppRoutes, RoutePropsAuth> = {
	[AppRoutes.HOME]: {
		path: routePaths.home,
		element: <HomePage />,
		authOnly: true,
	},
	[AppRoutes.ABOUT]: {
		path: routePaths.about,
		element: <AboutPageLazy />,
	},
	[AppRoutes.LOGIN]: {
		path: routePaths.login,
		element: <LoginPageLazy />,
		noAuthOnly: true,
	},
	[AppRoutes.REGISTER]: {
		path: routePaths.register,
		element: <RegisterPageLazy />,
		noAuthOnly: true,
	},
	[AppRoutes.NOT_FOUND]: {
		path: routePaths.not_found,
		element: <NotFoundPageLazy />,
	},
};
