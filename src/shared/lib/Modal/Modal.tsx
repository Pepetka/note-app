import {CSSProperties, ReactNode} from 'react';
import {Transition} from 'react-transition-group';
import {classNames} from 'shared/helpers/classNames/classNames';
import {Portal} from 'shared/lib/Portal/Portal';
import {useTheme} from 'shared/hooks/useTheme';
import {HStack} from 'shared/lib/Flex/HStack';
import {Overlay} from 'shared/lib/Overlay/Overlay';
import {useModal} from 'shared/hooks/useModal';

import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children: ReactNode
	onClose?: () => void
	isOpen: boolean
}

const duration = 300;

const defaultStyle: CSSProperties = {
	opacity: 0,
	transition: `all ${duration}ms ease-in`,
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

export const Modal = ({className, children, isOpen, onClose}: ModalProps) => {
	const {theme} = useTheme();
	const {isClose, isOpened} = useModal({
		isOpen,
		onClose,
	});

	return (
		<Portal>
			<Transition unmountOnExit timeout={duration} in={isOpen}>
				<div
					className={classNames([cls.Modal, className, theme, 'AppModal'], {[cls.close]: isClose})}
					data-testid='Modal'
				>
					<Overlay onClick={onClose}/>
					<HStack justify='center' align='center' w100 h100>
						<Transition in={isOpened} timeout={duration}>
							{(state) => (
								<div
									style={{
										...defaultStyle,
										...animateStyle[state],
									}}
									className={cls.content}
								>
									{children}
								</div>
							)}
						</Transition>
					</HStack>
				</div>
			</Transition>
		</Portal>
	);
};
