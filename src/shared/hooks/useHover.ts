import {useCallback, useMemo, useState} from 'react';

interface UseHoverReturn {
	hover: boolean
	onMouseEnter: () => void
	onMouseLeave: () => void
}

/**
 * Хук, возвращающий флаг, показывающий наведен ли курсор на элемент, и функции, отслеживающие наведение курсора на
 * элемент и сход курсора с элемента
 */
export const useHover = (): UseHoverReturn => {
	const [hover, setHover] = useState(false);
	const touchSupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

	const onMouseEnter = useCallback(() => {
		if (!touchSupport) setHover(true);
	}, [touchSupport]);

	const onMouseLeave = useCallback(() => {
		if (!touchSupport) setHover(false);
	}, [touchSupport]);

	return useMemo(() => (
		{
			hover,
			onMouseEnter,
			onMouseLeave,
		}
	), [hover, onMouseEnter, onMouseLeave]);
};
