import {memo, Suspense, useCallback} from 'react';
import {Route, Routes} from 'react-router-dom';
import {PageLoader} from 'components/PageLoader/PageLoader';
import {routeConfig, RoutePropsAuth} from './routeConfig';
import {RequireAuth} from './RequireAuth';

export const AppRouter = memo(() => {
	const renderWithWrapper = useCallback(({path, element, authOnly, noAuthOnly}: RoutePropsAuth) => {
		const routeElement = (
			<Suspense fallback={<PageLoader />}>
				{element}
			</Suspense>
		);

		return (
			<Route
				key={path}
				path={path}
				element={<RequireAuth authOnly={authOnly} noAuthOnly={noAuthOnly}>{routeElement}</RequireAuth>}
			/>
		);
	}, []);

	return (
		<Routes>
			{Object.values(routeConfig).map(renderWithWrapper)}
		</Routes>
	);
});
