import {CSSProperties, memo, ReactNode, TouchEvent, useRef, useState} from 'react';
import {Transition} from 'react-transition-group';
import {classNames} from '../../helpers/classNames/classNames';
import {Overlay} from '../Overlay/Overlay';
import {HStack} from '../Flex/HStack';
import {Portal} from '../Portal/Portal';
import {useTheme} from '../../hooks/useTheme';
import {useModal} from '../../hooks/useModal';

import cls from './Drawer.module.scss';

interface DrawerProps {
	className?: string;
	children: ReactNode
	onClose?: () => void
	isOpen: boolean
}

const duration = 300;

export const Drawer = memo(
	({className, children, isOpen, onClose}: DrawerProps) => {
		const {theme} = useTheme();
		const [startPosition, setStartPosition] = useState<number | null>(null);
		const [translate, setTranslate] = useState('0');
		const [startTime, setStartTime] = useState<number | null>(null);
		const {isClose, isOpened} = useModal({
			isOpen,
			onClose,
		});
		const nodeRef = useRef<HTMLDivElement>(null);

		const transitionStyles: Record<string, CSSProperties> = {
			enter: {
				opacity: 0.5,
				transform: 'translateY(100%)',
			},
			entered: {
				opacity: 1,
				transform: `translateY(${translate})`,
			},
			exit: {
				opacity: 1,
				transform: `translateY(${translate})`,
			},
			exited: {
				opacity: 0.5,
				transform: 'translateY(100%)',
			},
		};

		const defaultStyle = {
			transition: `all ${translate !== '0' ? 0 : (startPosition ? 100 : duration)}ms ease-in-out`,
			transform: 'translateY(100%)',
			opacity: 0.5,
		};

		const onTouchStartHandle = (event: TouchEvent<HTMLDivElement>) => {
			setStartPosition(event.changedTouches[0].screenY);
			setStartTime(Date.now());
		};

		const onTouchEndHandle = (event: TouchEvent<HTMLDivElement>) => {
			const endPosition = event.changedTouches[0].screenY;
			const endTime = Date.now();
			const velocity = (endPosition - startPosition!) / (endTime - startTime!);

			setTranslate('0');

			if (velocity > 0.3) {
				onClose?.();
				setTimeout(() => {
					setStartPosition(null);
					setStartTime(null);
				}, 300);
			} else {
				setStartPosition(null);
				setStartTime(null);
			}
		};

		const onTouchMoveHandle = (event: TouchEvent<HTMLDivElement>) => {
			const currentPosition = event.changedTouches[0].screenY;
			const translate = currentPosition - startPosition!;

			setTranslate(translate >= -30 ? `${translate}px` : '-30px');
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
