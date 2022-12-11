import {CSSProperties, memo, ReactNode, TouchEvent, useRef, useState} from 'react';
import {CSSTransition, Transition} from 'react-transition-group';
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
			entering: {
				opacity: 1,
				transform: 'translateY(0)',
			},
			entered: {
				opacity: 1,
				transform: `translateY(${translate})`,
			},
			exiting: {
				opacity: 0.5,
				transform: 'translateY(100%)',
			},
			exited: {
				opacity: 0.5,
				transform: 'translateY(100%)',
			},
		};

		const defaultStyle = {
			transition: `all ${translate !== '0' ? '0' : duration}ms ease-in-out`,
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
			setStartPosition(null);
			setStartTime(null);

			if (velocity > 0.3) {
				onClose?.();
			}
		};

		const onTouchMoveHandle = (event: TouchEvent<HTMLDivElement>) => {
			const currentPosition = event.changedTouches[0].screenY;
			const translate = currentPosition - startPosition!;

			setTranslate(translate >= 0 ? `${translate}px` : '0');
		};

		return (
			<Portal>
				<CSSTransition unmountOnExit timeout={duration} in={isOpen}>
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
				</CSSTransition>
			</Portal>
		);
	},
);
