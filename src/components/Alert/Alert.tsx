import {AnimatePresence, motion} from 'framer-motion';
import {hideAlert} from 'store/slices/alertSlice';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames';
import {Button, ButtonThemes} from 'components/lib/Button/Button';

import cls from './Alert.module.scss';

export const Alert = () => {
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
			{visible ? (
				<motion.div {...variants} className={classNames([cls.AppAlert, cls[type]])}>
					<div><strong>{t('Attention')}</strong>
						<br/>
						<div>{text}</div>
					</div>
					<Button
						onClick={onCloseAlert}
						className={cls.close}
						theme={ButtonThemes.CLEAR}
					><i className="fa-solid fa-xmark"></i></Button>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
