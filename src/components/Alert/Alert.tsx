import {motion, AnimatePresence} from 'framer-motion';
import {hideAlert} from 'store/slices/alertSlice';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';

export const Alert = () => {
	const dispatch = useAppDispatch();
	const {type, visible, text} = useAppSelector((store) => store.alert);

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
				<motion.div {...variants} className={`alert alert-${type} alert-dismissible`}>
					<strong>Attention!</strong>
					<br />
					{text}
					<button
						onClick={() => dispatch(hideAlert())}
						type='button'
						className='btn-close'
					></button>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
