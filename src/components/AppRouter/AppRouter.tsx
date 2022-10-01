import {Route, RouteProps, Routes} from 'react-router-dom';
import {HomePage} from 'pages/HomePage/HomePage';
import {AboutPage} from 'pages/AboutPage/AboutPage';
import {LoginPage} from 'pages/LoginPage/LoginPage';
import {RegisterPage} from 'pages/RegisterPage/RegisterPage';
import {NotFoundPage} from '../../pages/NotFoundPage/NotFoundPage';

const enum AppRoutes { // eslint-disable-line
	HOME = 'home', // eslint-disable-line
	ABOUT = 'about', // eslint-disable-line
	LOGIN = 'login', // eslint-disable-line
	REGISTER = 'register', // eslint-disable-line
	NOT_FOUND = 'not_found' // eslint-disable-line
}

const routePaths: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.REGISTER]: '/register',
	[AppRoutes.NOT_FOUND]: '*',

};

const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.HOME]: {
		path: routePaths.home,
		element: <HomePage />,
	},
	[AppRoutes.ABOUT]: {
		path: routePaths.about,
		element: <AboutPage />,
	},
	[AppRoutes.LOGIN]: {
		path: routePaths.login,
		element: <LoginPage />,
	},
	[AppRoutes.REGISTER]: {
		path: routePaths.register,
		element: <RegisterPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: routePaths.not_found,
		element: <NotFoundPage />,
	},
};

export const AppRouter = () => {
	return (
		<Routes>
			{Object.entries(routeConfig).map(([_, {path, element}]) => (
				<Route
					key={path}
					path={path}
					element={element} />
			))}
		</Routes>
	);
};
