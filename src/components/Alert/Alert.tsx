import {CSSProperties, memo, useEffect, useRef} from 'react';
import {alertActions} from 'store/model/alert/slice/alertSlice';
import {useTranslation} from 'react-i18next';
import {classNames} from 'shared/helpers/classNames/classNames';
import {Button, ButtonThemes} from 'shared/lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {Transition} from 'react-transition-group';
import {getAlertState} from 'store/model/alert/selectors/getState/getAlertState';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {useSelector} from 'react-redux';
import {HStack} from 'shared/lib/Flex/HStack';

import cls from './Alert.module.scss';

const duration = 300;

const defaultStyle: CSSProperties = {
	opacity: 0,
	transform: 'scale(0.3)',
	transition: `all ${duration}ms ease-in-out`,
};

const animateStyle: Record<string, CSSProperties> = {
	enter: {
		opacity: 0,
		transform: 'scale(0.3)',
	},
	entered: {
		opacity: 1,
		transform: 'scale(1)',
	},
	exit: {
		opacity: 1,
		transform: 'scale(1)',
	},
	exited: {
		opacity: 0,
		transform: 'scale(0.3)',
	},
};

export const Alert = memo(() => {
	const dispatch = useAppDispatch();
	const {type, visible, text} = useSelector(getAlertState);
	const {t} = useTranslation();
	const btnRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		btnRef.current?.focus();
	}, []);


	const onCloseAlert = () => {
		dispatch(alertActions.hideAlert());
	};

	return (
		<Transition in={visible} timeout={duration} unmountOnExit>
			{(state) => (
				<HStack
					justify='between'
					w100
					className={
						classNames([cls.AppAlert, cls[type]])
					}
					style={{
						...defaultStyle,
						...animateStyle[state],
					}}
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
				</HStack>
			)}
		</Transition>
	);
});
