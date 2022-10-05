import {useAppDispatch} from 'hooks/useRedux';
import {useAuth} from 'hooks/useAuth';
import {NavLink} from 'react-router-dom';
import {clearNotes} from 'store/slices/firebaseSlice';
import {removeUser} from 'store/slices/userSlice';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';

import cls from './NavBar.module.scss';

export const NavBar = () => {
	const dispatch = useAppDispatch();
	const {isAuth} = useAuth();
	const {t} = useTranslation();

	const onLogOut = () => {
		dispatch(removeUser());
		dispatch(clearNotes());
		localStorage.removeItem('user');
	};

	return (
		<header className={cls.NavBar}>
			<div className={cls.wrapper}>
				<nav className={cls.mainLinks}>
					<div className={cls.brand}>{t('Note App')}</div>

					<ul className={cls.list}>
						<li>
							<NavLink
								to={'/'}
								className={({isActive}) =>
									classNames([cls.link], {[cls.active]: isActive})
								}
							>
								{t('Home')}
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/about'}
								className={({isActive}) =>
									classNames([cls.link], {[cls.active]: isActive})
								}
							>
								{t('About')}
							</NavLink>
						</li>
					</ul>
				</nav>

				<ul className={cls.list}>
					<li>
						{isAuth ? (
							<NavLink
								to={'/login'}
								className={({isActive}) =>
									classNames([cls.link], {[cls.active]: isActive})
								}
								onClick={onLogOut}
							>
								{t('Logout')}
							</NavLink>
						) : (
							<NavLink
								to={'/login'}
								className={({isActive}) =>
									classNames([cls.link], {[cls.active]: isActive})
								}
							>
								{t('Login')}
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		</header>
	);
};

