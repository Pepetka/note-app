import {ReactNode, useEffect, useRef, useState, MouseEvent, useCallback} from 'react';
import {CSSTransition} from 'react-transition-group';
import {classNames} from 'helpers/classNames/classNames';
import {Portal} from 'lib/Portal/Portal';
import {useTheme} from 'hooks/useTheme';
import {getScrollbarWidth} from 'helpers/scrollbarWidth/scrollbarWidth';

import cls from './Modal.module.scss';
import './ModalAnimation.scss';

interface ModalProps {
	className?: string;
	children: ReactNode
	onClose?: () => void
	isOpen: boolean
}

export const Modal = ({className, children, isOpen, onClose}: ModalProps) => {
	const [isClose, setIsClose] = useState(true);
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	const {theme} = useTheme();

	const onKeyClose = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape' && onClose) onClose();
	}, [onClose]);

	useEffect(() => {
		if (isOpen) {
			setIsClose(false);

			window.addEventListener('keydown', onKeyClose);

			if ((document.querySelector('#sideBar') as HTMLElement)) {
				(document.querySelector('#sideBar') as HTMLElement).style.marginRight = `${getScrollbarWidth()}px`;
			}
			document.body.style.overflowY = 'hidden';
			document.body.style.marginRight = `${getScrollbarWidth()}px`;
		} else {
			timerRef.current = setTimeout(() => {
				setIsClose(true);

				if ((document.querySelector('#sideBar') as HTMLElement)) {
					(document.querySelector('#sideBar') as HTMLElement).style.marginRight = '0';
				}
				document.body.style.overflowY = 'scroll';
				document.body.style.marginRight = '0';
			}, 300);
		}

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyClose);
		};
	}, [isOpen, onKeyClose]);

	const onContentClick = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<Portal>
			<div className={classNames([cls.Modal, className, theme, 'AppModal'], {[cls.close]: isClose})}>
				<div className={cls.overlay} onClick={onClose}>
					<CSSTransition in={isOpen} classNames='modalContent' timeout={300}>
						<div className={cls.content} onClick={onContentClick}>
							{children}
						</div>
					</CSSTransition>
				</div>
			</div>
		</Portal>
	);
};
