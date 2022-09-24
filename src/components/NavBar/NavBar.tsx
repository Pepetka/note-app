import {useAppDispatch} from 'hooks/useRedux';
import {useAuth} from 'hooks/useAuth';
import {NavLink} from 'react-router-dom';
import {clearNotes} from 'store/slices/firebaseSlice';
import {removeUser} from 'store/slices/userSlice';
import {useTranslation} from 'react-i18next';

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
		<nav className='navbar navbar-expand d-flex justify-content-between primary-bg'>
			<div className='container-fluid d-flex justify-content-between'>
				<div className='d-flex justify-content-between'>
					<div className='navbar-brand primary-text'>{t('Note App')}</div>

					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link primary-link' to={'/'}>
								{t('Home')}
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link primary-link' to={'/about'}>
								{t('About')}
							</NavLink>
						</li>
					</ul>
				</div>

				<ul className='navbar-nav'>
					<li className='nav-item'>
						{isAuth ? (
							<NavLink
								className='nav-link primary-link'
								to={'/login'}
								onClick={onLogOut}>
								{t('Logout')}
							</NavLink>
						) : (
							<NavLink className='nav-link primary-link' to={'/login'}>
								{t('Login')}
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		</nav>
	);
};

