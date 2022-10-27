import {NavBar} from 'components/NavBar/NavBar';
import {Alert} from 'components/Alert/Alert';
import {AppRouter} from 'components/AppRouter/AppRouter';
import {SideBar} from 'components/SideBar/SideBar';
import {classNames} from 'helpers/classNames/classNames';
import {useTheme} from 'hooks/useTheme';
import {memo, useEffect} from 'react';
import {userActions} from 'store/model/user/slice/userSlice';
import {useAppDispatch} from 'hooks/useRedux';

import '../../firebase';

import cls from './App.module.scss';

export const App = memo(() => {
	const {theme} = useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.initUser());
	}, [dispatch]);

	return (
		<div className={classNames(['App', theme])}>
			<NavBar />
			<main>
				<div className={cls.AppContainer}>
					<Alert />
					<AppRouter/>
				</div>
			</main>
			<SideBar />
		</div>
	);
});

