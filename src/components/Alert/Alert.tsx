import {AnimatePresence, motion} from 'framer-motion';
import {AlertType, hideAlert} from 'store/slices/alertSlice';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {Button, ButtonThemes} from 'components/lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import cls from './Alert.module.scss';

interface AlertProps {
	storybookText?: string
	storybookType?: AlertType
	storybookVisible?: boolean
}

export const Alert = ({storybookType, storybookVisible, storybookText}: AlertProps) => {
	const dispatch = useAppDispatch();
	const {type, visible, text} = useAppSelector((store) => store.alert);
	const {t} = useTranslation();

	const variants = {
		initial: {
			opacity: 0,
			scale: 0,
		},
		animate: {
			opacity: 1,
			scale: 1,
		},
		exit: {
			opacity: 0,
			scale: 0,
		},
	};

	const onCloseAlert = () => {
		dispatch(hideAlert());
	};

	return (
		<AnimatePresence>
			{(storybookVisible ?? visible) ? (
				<motion.div {...variants} className={classNames([cls.AppAlert, cls[(storybookType ?? type)]])}>
					<div><strong>{t('Attention')}</strong>
						<br/>
						<div>{(storybookText ?? text)}</div>
					</div>
					<Button
						onClick={onCloseAlert}
						className={cls.close}
						theme={ButtonThemes.CLEAR}
					>
						<FontAwesomeIcon icon={faXmark} />
					</Button>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
