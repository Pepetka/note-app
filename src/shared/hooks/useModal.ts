import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

interface UseModalProps {
	onClose?: () => void
	isOpen: boolean
}

/**
 * Хук, возвращающий флаги, определяющие завершение процесса открытия и закрытия модального окна.
 * Дополнительно хук отслеживает нажатие клавиш 'Escape' и 'Space', вызываю функцию onClose
 * @param onClose - функция, закрывающая модальное окно
 * @param isOpen - флаг, определяющий открыто ли модальное окно
 */
export const useModal = ({onClose, isOpen}: UseModalProps) => {
	const [isClose, setIsClose] = useState(true);
	const [isOpened, setIsOpened] = useState(false);
	const openTimerRef = useRef<ReturnType<typeof setTimeout>>();
	const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();

	const onKeyClose = useCallback((event: KeyboardEvent) => {
		if ((event.key === 'Escape' || event.key === 'Space') && onClose) onClose();
	}, [onClose]);

	useEffect(() => {
		if (isOpen) {
			openTimerRef.current = setTimeout(() => {
				setIsOpened(true);
				setIsClose(false);

				window.addEventListener('keydown', onKeyClose);
			});
		} else {
			setIsOpened(false);

			closeTimerRef.current = setTimeout(() => {
				setIsClose(true);
			}, 300);
		}

		return () => {
			clearTimeout(closeTimerRef.current);
			clearTimeout(openTimerRef.current);
			window.removeEventListener('keydown', onKeyClose);
		};
	}, [isOpen, onKeyClose]);

	return useMemo(() => ({
		isClose,
		isOpened,
	}), [isClose, isOpened]);
};
