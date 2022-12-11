import {ReactNode} from 'react';
import {CSSTransition} from 'react-transition-group';
import {classNames} from 'shared/helpers/classNames/classNames';
import {Portal} from 'shared/lib/Portal/Portal';
import {useTheme} from 'shared/hooks/useTheme';
import {HStack} from 'shared/lib/Flex/HStack';
import {Overlay} from 'shared/lib/Overlay/Overlay';
import {useModal} from 'shared/hooks/useModal';

import cls from './Modal.module.scss';
import './ModalAnimation.scss';

interface ModalProps {
	className?: string;
	children: ReactNode
	onClose?: () => void
	isOpen: boolean
}

export const Modal = ({className, children, isOpen, onClose}: ModalProps) => {
	const {theme} = useTheme();
	const {isClose, isOpened} = useModal({
		isOpen,
		onClose,
	});

	return (
		<Portal>
			<CSSTransition unmountOnExit timeout={300} in={isOpen}>
				<div
					className={classNames([cls.Modal, className, theme, 'AppModal'], {[cls.close]: isClose})}
					data-testid='Modal'
				>
					<Overlay onClick={onClose}/>
					<HStack justify='center' align='center' w100 h100>
						<CSSTransition in={isOpened} classNames='modalContent' timeout={300}>
							<div className={cls.content}>
								{children}
							</div>
						</CSSTransition>
					</HStack>
				</div>
			</CSSTransition>
		</Portal>
	);
};
