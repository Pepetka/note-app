import {useAuth} from 'shared/hooks/useAuth';
import {NavLink} from 'react-router-dom';
import {notesActions} from 'store/model/notes/slice/notesSlice';
import {userActions} from 'store/model/user/slice/userSlice';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/helpers/classNames/classNames';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {memo, useCallback} from 'react';
import {HStack} from 'shared/lib/Flex/HStack';

import cls from './NavBar.module.scss';

export const NavBar = memo(() => {
	const dispatch = useAppDispatch();
	const {isAuth} = useAuth();
	const {t} = useTranslation();

	const onLogOut = useCallback(() => {
		dispatch(userActions.removeUser());
		dispatch(notesActions.clearNotes());
	}, [dispatch]);

	return (
		<header className={cls.NavBar} data-testid='NavBar'>
			<HStack justify='between' align='center' h100 className={cls.wrapper}>
				<nav>
					<HStack justify='center' gap='8'>
						<div className={cls.brand}>{t('Note App')}</div>

						<HStack gap='8'>
							<NavLink
								to={'/'}
								data-testid='NavBar_home'
								className={({isActive}) =>
									classNames([cls.link], {[cls.active]: isActive})
								}
							>
								{t('Home')}
							</NavLink>
							<NavLink
								to={'/about'}
								data-testid='NavBar_about'
								className={({isActive}) =>
									classNames([cls.link], {[cls.active]: isActive})
								}
							>
								{t('About')}
							</NavLink>
						</HStack>
					</HStack>
				</nav>

				<HStack gap='8'>
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
				</HStack>
			</HStack>
		</header>
	);
});

