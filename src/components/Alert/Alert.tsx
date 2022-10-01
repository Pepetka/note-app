import {motion, AnimatePresence} from 'framer-motion';
import {hideAlert} from 'store/slices/alertSlice';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';

import './Alert.scss';

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

	return (
		<AnimatePresence>
			{visible ? (
				<motion.div {...variants} className={`appAlert appAlert_${type}`}>
					<div><strong className='appAlert__attention'>{t('Attention')}</strong>
						<br/>
						<div className='appAlert__text'>{text}</div>
					</div>
					<button
						onClick={() => dispatch(hideAlert())}
						type='button'
						className='appAlert__close'
					><i className="fa-solid fa-xmark"></i></button>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
