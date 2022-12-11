import {Navigate, useLocation} from 'react-router-dom';
import {routePaths} from './routeConfig';
import {useAuth} from '../../shared/hooks/useAuth';

interface RequireAuthProps {
	children: JSX.Element
	authOnly?: boolean
	noAuthOnly?: boolean
}

export const RequireAuth = ({children, noAuthOnly, authOnly}: RequireAuthProps) => {
	const {isAuth} = useAuth();
	const location = useLocation();

	if (authOnly && !isAuth) return <Navigate to={routePaths.login} state={{from: location}} replace />;
	if (noAuthOnly && isAuth) return <Navigate to={routePaths.home} state={{from: location}} replace />;

	return children;
};
