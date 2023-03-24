import {CSSProperties, memo, ReactNode, useRef} from 'react';
import {Transition} from 'react-transition-group';
import {classNames} from 'shared/helpers/classNames/classNames';
import {Overlay} from 'shared/lib/Overlay/Overlay';
import {HStack} from 'shared/lib/Flex/HStack';
import {Portal} from 'shared/lib/Portal/Portal';
import {useTheme} from 'shared/hooks/useTheme';
import {useSwipe} from 'shared/hooks/useSwipe';
import {useModal} from 'shared/hooks/useModal';

import cls from './Drawer.module.scss';

interface DrawerProps {
	/**
	 * Дополнительные классы
	 */
	className?: string;
	/**
	 * Содержимое компонента
	 */
	children: ReactNode
	/**
	 * Функция, закрывающая drawer
	 */
	onClose?: () => void
	/**
	 * Флаг, отвечающий за открытие компонента
	 */
	isOpen: boolean
}

const duration = 300;

export const Drawer = memo(
	({className, children, isOpen, onClose}: DrawerProps) => {
		const {theme} = useTheme();
		const {isClose, isOpened} = useModal({
			isOpen,
			onClose,
		});
		const nodeRef = useRef<HTMLDivElement>(null);
		const {translate, getDuration, onTouchStartHandle, onTouchEndHandle, onTouchMoveHandle} = useSwipe({
			onClose,
			duration,
			condition: 'velocity',
			topSpeed: 0.3,
			limits: {
				bottomLimit: -50,
			},
		});

		const transitionStyles: Record<string, CSSProperties> = {
			enter: {
				opacity: 0.5,
				transform: 'translateY(100%)',
			},
			entered: {
				opacity: 1,
				transform: `translateY(${translate}px)`,
			},
			exit: {
				opacity: 1,
				transform: `translateY(${translate}px)`,
			},
			exited: {
				opacity: 0.5,
				transform: 'translateY(100%)',
			},
		};

		const defaultStyle = {
			transition: `all ${getDuration()}ms ease-in-out`,
			transform: 'translateY(100%)',
			opacity: 0.5,
		};

		return (
			<Portal>
				<Transition unmountOnExit timeout={duration} in={isOpen}>
					<div
						className={classNames([cls.Drawer, className, theme, 'AppDrawer'], {[cls.close]: isClose})}
						data-testid='Drawer'
					>
						<Overlay onClick={onClose}/>
						<HStack justify='center' align='end' w100 h100>
							<Transition nodeRef={nodeRef} in={isOpened} timeout={duration}>
								{(state) => (
									<div
										ref={nodeRef}
										className={cls.content}
										onTouchStart={onTouchStartHandle}
										onTouchEnd={onTouchEndHandle}
										onTouchMove={onTouchMoveHandle}
										style={{
											...defaultStyle,
											...transitionStyles[state],
										}}
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
	},
);
