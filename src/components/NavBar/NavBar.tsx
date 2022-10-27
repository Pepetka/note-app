import {useAuth} from 'hooks/useAuth';
import {NavLink} from 'react-router-dom';
import {notesActions} from 'store/model/notes/slice/notesSlice';
import {userActions} from 'store/model/user/slice/userSlice';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {useAppDispatch} from 'hooks/useRedux';
import {LocalStorageKeys} from 'const/localStorage';
import {memo, useCallback} from 'react';

import cls from './NavBar.module.scss';

export const NavBar = memo(() => {
	const dispatch = useAppDispatch();
	const {isAuth} = useAuth();
	const {t} = useTranslation();

	const onLogOut = useCallback(() => {
		dispatch(userActions.removeUser());
		dispatch(notesActions.clearNotes());
		localStorage.removeItem(LocalStorageKeys.USER);
	}, [dispatch]);

	return (
		<header className={cls.NavBar} data-testid='NavBar'>
			<div className={cls.wrapper}>
				<nav className={cls.mainLinks}>
					<div className={cls.brand}>{t('Note App')}</div>

					<ul className={cls.list}>
						<li>
							<NavLink
								to={'/'}
								data-testid='NavBar_home'
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
								data-testid='NavBar_about'
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
								data-testid='NavBar_logout'
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
								data-testid='NavBar_login'
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
});

