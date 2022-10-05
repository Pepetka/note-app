import {Suspense} from 'react';
import {Route, RouteProps, Routes} from 'react-router-dom';
import {HomePage} from 'pages/HomePage/HomePage';
import {AboutPageLazy} from 'pages/AboutPage/AboutPage.lazy';
import {PageLoader} from 'components/PageLoader/PageLoader';
import {LoginPageLazy} from 'pages/LoginPage/LoginPage.lazy';
import {RegisterPageLazy} from 'pages/RegisterPage/RegisterPage.lazy';
import {NotFoundPageLazy} from 'pages/NotFoundPage/NotFoundPage.lazy';

const enum AppRoutes {
	HOME = 'home',
	ABOUT = 'about',
	LOGIN = 'login',
	REGISTER = 'register',
	NOT_FOUND = 'not_found'
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
		element: <AboutPageLazy />,
	},
	[AppRoutes.LOGIN]: {
		path: routePaths.login,
		element: <LoginPageLazy />,
	},
	[AppRoutes.REGISTER]: {
		path: routePaths.register,
		element: <RegisterPageLazy />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: routePaths.not_found,
		element: <NotFoundPageLazy />,
	},
};

export const AppRouter = () => {
	return (
		<Suspense fallback={<PageLoader/>}>
			<Routes>
				{Object.entries(routeConfig).map(([_, {path, element}]) => (
					<Route
						key={path}
						path={path}
						element={element}/>
				))}
			</Routes>
		</Suspense>
	);
};
