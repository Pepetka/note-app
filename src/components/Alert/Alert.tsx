import {AlertType, hideAlert} from 'store/slices/alertSlice';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {CSSTransition} from 'react-transition-group';

import cls from './Alert.module.scss';
import './AlertAnimation.scss';

interface AlertProps {
	storybookText?: string
	storybookType?: AlertType
	storybookVisible?: boolean
}

export const Alert = ({storybookType, storybookVisible, storybookText}: AlertProps) => {
	const dispatch = useAppDispatch();
	const {type, visible, text} = useAppSelector((store) => store.alert);
	const {t} = useTranslation();

	const onCloseAlert = () => {
		dispatch(hideAlert());
	};

	return (
		<CSSTransition in={storybookVisible ?? visible} classNames='alert' timeout={300} unmountOnExit>
			<div
				className={
					classNames([cls.AppAlert, cls[(storybookType ?? type)]])
				}
			>
				<div><strong>{t('Attention')}</strong>
					<br />
					<div>{(storybookText ?? text)}</div>
				</div>
				<Button
					onClick={onCloseAlert}
					className={cls.close}
					theme={ButtonThemes.CLEAR}
				>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</div>
		</CSSTransition>
	);
};
