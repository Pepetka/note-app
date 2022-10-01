import {useAppDispatch} from 'hooks/useRedux';
import {useAuth} from 'hooks/useAuth';
import {NavLink} from 'react-router-dom';
import {clearNotes} from 'store/slices/firebaseSlice';
import {removeUser} from 'store/slices/userSlice';
import {useTranslation} from 'react-i18next';

import './NavBar.scss';

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
		<nav className='navBar'>
			<div className='navBar__wrapper'>
				<div className='navBar__mainLinks'>
					<div className='navBar__brand'>{t('Note App')}</div>

					<ul className='navBar__list'>
						<li className='navBar__item'>
							<NavLink className='navBar__link' to={'/'}>
								{t('Home')}
							</NavLink>
						</li>
						<li className='navBar__item'>
							<NavLink className='navBar__link' to={'/about'}>
								{t('About')}
							</NavLink>
						</li>
					</ul>
				</div>

				<ul className='navBar__list'>
					<li className='navBar__item'>
						{isAuth ? (
							<NavLink
								className='navBar__link'
								to={'/login'}
								onClick={onLogOut}>
								{t('Logout')}
							</NavLink>
						) : (
							<NavLink className='navBar__link' to={'/login'}>
								{t('Login')}
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
};

