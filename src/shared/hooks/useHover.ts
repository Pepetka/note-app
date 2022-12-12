import {useCallback, useMemo, useState} from 'react';

interface UseHoverReturn {
	hover: boolean
	onMouseEnter: () => void
	onMouseLeave: () => void
}

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
