import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

interface UseModalProps {
	onClose?: () => void
	isOpen: boolean
}

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
