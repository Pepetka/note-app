import {TouchEvent, useCallback, useState} from 'react';

interface LimitsType {
	bottomLimit?: number
	topLimit?: number
}

interface UseSwipePropsBase {
	onClose?: () => void
	duration?: number
	direction?: 'x' | 'y'
	isSwipeDisabled?: boolean
	limits?: LimitsType
	condition: 'velocity' | 'coordinate'
	fixedLimits?: boolean
	blindArea?: number
}

type UseSwipePropsVelocity = UseSwipePropsBase & {
	condition: 'velocity'
	topSpeed: number
	topCoordinate?: never
}

type UseSwipePropsCoordinate = UseSwipePropsBase & {
	condition: 'coordinate'
	topSpeed?: never
	topCoordinate: number
}

type UseSwipeProps = UseSwipePropsVelocity | UseSwipePropsCoordinate

export const useSwipe = (
	{
		onClose,
		direction = 'y',
		topSpeed,
		topCoordinate,
		condition,
		duration = 0,
		isSwipeDisabled = false,
		limits,
		fixedLimits,
		blindArea = 0,
	}: UseSwipeProps,
) => {
	const [startPosition, setStartPosition] = useState<number | null>(null);
	const [defaultTranslate, setDefaultTranslate] = useState(0);
	const [translate, setTranslate] = useState(defaultTranslate);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [blindAreaInited, setBlindAreaInited] = useState(false);

	const onTouchStartHandle = useCallback((event: TouchEvent<HTMLDivElement>) => {
		setBlindAreaInited(false);
		setStartPosition(direction === 'y' ? event.changedTouches[0].screenY : event.changedTouches[0].screenX);
		setStartTime(Date.now());
	}, [direction]);

	const onForceClose = useCallback(() => {
		setTimeout(() => {
			setStartPosition(null);
			setStartTime(null);
		}, duration);
		setTranslate(0);
		setDefaultTranslate(0);
	}, [duration]);

	const changeDefaultLimits = useCallback(() => {
		if (fixedLimits && limits?.topLimit && limits?.bottomLimit) {
			const currentTranslate = defaultTranslate === 0 ? (translate > 0 ? limits?.topLimit : limits?.bottomLimit) : 0;
			setDefaultTranslate(currentTranslate);
			return currentTranslate;
		} else {
			return 0;
		}
	}, [defaultTranslate, fixedLimits, limits?.bottomLimit, limits?.topLimit, translate]);

	const onTouchEndHandle = useCallback((event: TouchEvent<HTMLDivElement>) => {
		const endPosition = direction === 'y' ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
		const endTime = Date.now();
		const coordinate = (endPosition - startPosition!);
		const velocity = coordinate / (endTime - startTime!);
		const closeCondition = condition === 'velocity' ? (Math.abs(velocity) > topSpeed) : (Math.abs(coordinate) > topCoordinate);

		if (closeCondition) {
			onClose?.();
			setTimeout(() => {
				setStartPosition(null);
				setStartTime(null);
			}, duration);
			setTranslate(changeDefaultLimits());
		} else {
			setStartPosition(null);
			setStartTime(null);
			setTranslate(defaultTranslate);
		}
	}, [condition, defaultTranslate, direction, duration, onClose, startPosition, startTime, changeDefaultLimits, topCoordinate, topSpeed]);

	const onTouchMoveHandle = useCallback((event: TouchEvent<HTMLDivElement>) => {
		const currentPosition = direction === 'y' ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
		const diff = currentPosition - startPosition!;
		let currentTranslate = diff + defaultTranslate;

		if (limits?.bottomLimit) {
			currentTranslate = currentTranslate > limits.bottomLimit ?
				currentTranslate :
				limits.bottomLimit;
		}

		if (limits?.topLimit) {
			currentTranslate = currentTranslate < limits.topLimit ?
				currentTranslate :
				limits.topLimit;
		}

		if (Math.abs(diff) > blindArea || blindAreaInited) {
			setTranslate(currentTranslate);
			setBlindAreaInited(true);
		}
	}, [blindArea, blindAreaInited, defaultTranslate, direction, limits?.bottomLimit, limits?.topLimit, startPosition]);

	const getDuration = useCallback(() => {
		return translate !== defaultTranslate ? 0 : (startPosition !== null ? 100 : duration);
	}, [defaultTranslate, duration, startPosition, translate]);

	return {
		translate,
		getDuration,
		onTouchStartHandle: isSwipeDisabled ? undefined : onTouchStartHandle,
		onTouchEndHandle: isSwipeDisabled ? undefined : onTouchEndHandle,
		onTouchMoveHandle: isSwipeDisabled ? undefined : onTouchMoveHandle,
		onForceClose,
	};
};
