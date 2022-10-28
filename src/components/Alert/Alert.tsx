import {memo, useEffect, useRef} from 'react';
import {alertActions} from 'store/model/alert/slice/alertSlice';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {CSSTransition} from 'react-transition-group';
import {getAlertState} from 'store/model/alert/selectors/getState/getAlertState';
import {useAppDispatch} from 'hooks/useRedux';
import {useSelector} from 'react-redux';

import cls from './Alert.module.scss';
import './AlertAnimation.scss';

export const Alert = memo(() => {
	const dispatch = useAppDispatch();
	const {type, visible, text} = useSelector(getAlertState);
	const {t} = useTranslation();
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		btnRef.current?.focus();
	}, []);


	const onCloseAlert = () => {
		dispatch(alertActions.hideAlert());
	};

	return (
		<CSSTransition in={visible} classNames='alert' timeout={300} unmountOnExit>
			<div
				className={
					classNames([cls.AppAlert, cls[type]])
				}
				data-testid='Alert'
			>
				<div><strong>{t('Attention')}</strong>
					<br />
					<div>{text}</div>
				</div>
				<Button
					ref={btnRef}
					autoFocus={true}
					onClick={onCloseAlert}
					className={cls.close}
					theme={ButtonThemes.CLEAR}
				>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</div>
		</CSSTransition>
	);
});
