import {useAppDispatch} from 'hooks/useRedux';
import {useAuth} from 'hooks/useAuth';
import {NavLink} from 'react-router-dom';
import {clearNotes} from 'store/slices/firebaseSlice';
import {removeUser} from 'store/slices/userSlice';
import {useTranslation} from 'react-i18next';

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
		<nav className={cls.NavBar}>
			<div className={cls.wrapper}>
				<div className={cls.mainLinks}>
					<div className={cls.brand}>{t('Note App')}</div>

					<ul className={cls.list}>
						<li>
							<NavLink className={cls.link} to={'/'}>
								{t('Home')}
							</NavLink>
						</li>
						<li>
							<NavLink className={cls.link} to={'/about'}>
								{t('About')}
							</NavLink>
						</li>
					</ul>
				</div>

				<ul className={cls.list}>
					<li>
						{isAuth ? (
							<NavLink
								className={cls.link}
								to={'/login'}
								onClick={onLogOut}>
								{t('Logout')}
							</NavLink>
						) : (
							<NavLink className={cls.link} to={'/login'}>
								{t('Login')}
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
};

