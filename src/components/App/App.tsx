import {NavBar} from 'components/NavBar/NavBar';
import {Alert} from 'components/Alert/Alert';
import {AppRouter} from 'components/AppRouter/AppRouter';
import {classNames} from 'shared/helpers/classNames/classNames';
import {useTheme} from 'shared/hooks/useTheme';
import {memo, useEffect} from 'react';
import {userActions} from 'store/model/user/slice/userSlice';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {Page} from 'shared/lib/Page/Page';

import '../../firebase';

export const App = memo(() => {
	const {theme} = useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.initUser());
	}, [dispatch]);

	return (
		<div className={classNames(['App', theme])}>
			<NavBar />
			<Page>
				<Alert />
				<AppRouter/>
			</Page>
		</div>
	);
});

