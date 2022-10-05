import {NavBar} from 'components/NavBar/NavBar';
import {Alert} from 'components/Alert/Alert';
import {AppRouter} from 'components/AppRouter/AppRouter';
import {SideBar} from 'components/SideBar/SideBar';
import {classNames} from 'helpers/classNames/classNames';
import {useTheme} from 'hooks/useTheme';

import '../../firebase';
import cls from './App.module.scss';

export const App = () => {
	const {theme} = useTheme();

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
};

