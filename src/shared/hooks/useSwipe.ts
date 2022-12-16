import {TouchEvent, useCallback, useState} from 'react';

interface LimitsType {
	bottomLimit?: number
	topLimit?: number
}

interface UseSwipePropsBase {
	onClose?: () => void
	duration: number
	direction?: 'x' | 'y'
	isSwipeDisabled?: boolean
	limits?: LimitsType
	condition: 'velocity' | 'coordinate'
}

type UseSwipePropsVelocity = UseSwipePropsBase & {
	condition: 'velocity'
	topSpeed?: number
	topCoordinate?: never
}

type UseSwipePropsCoordinate = UseSwipePropsBase & {
	condition: 'coordinate'
	topSpeed?: never
	topCoordinate?: number
}

type UseSwipeProps = UseSwipePropsVelocity | UseSwipePropsCoordinate

export const useSwipe = (
	{onClose, direction = 'y', topSpeed = 0.3, topCoordinate = 50, condition, duration, isSwipeDisabled = false, limits}: UseSwipeProps,
) => {
	const [startPosition, setStartPosition] = useState<number | null>(null);
	const [translate, setTranslate] = useState('0');
	const [startTime, setStartTime] = useState<number | null>(null);
	const onTouchStartHandle = useCallback((event: TouchEvent<HTMLDivElement>) => {
		setStartPosition(direction === 'y' ? event.changedTouches[0].screenY : event.changedTouches[0].screenX);
		setStartTime(Date.now());
	}, [direction]);

	const onTouchEndHandle = useCallback((event: TouchEvent<HTMLDivElement>) => {
		const endPosition = direction === 'y' ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
		const endTime = Date.now();
		const coordinate = (endPosition - startPosition!);
		const velocity = coordinate / (endTime - startTime!);
		const closeCondition = condition === 'velocity' ? (Math.abs(velocity) > topSpeed) : (Math.abs(coordinate) > topCoordinate);

		setTranslate('0');

		if (closeCondition) {
			onClose?.();
			setTimeout(() => {
				setStartPosition(null);
				setStartTime(null);
			}, duration);
		} else {
			setStartPosition(null);
			setStartTime(null);
		}
	}, [condition, direction, duration, onClose, startPosition, startTime, topCoordinate, topSpeed]);

	const onTouchMoveHandle = useCallback((event: TouchEvent<HTMLDivElement>) => {
		const currentPosition = direction === 'y' ? event.changedTouches[0].screenY : event.changedTouches[0].screenX;
		const diff = currentPosition - startPosition!;
		let translate = `${diff}px`;

		if (limits?.bottomLimit) {
			translate = diff > limits.bottomLimit ? translate : `${limits.bottomLimit}px`;
		}

		if (limits?.topLimit) {
			translate = diff < limits.topLimit ? translate : `${limits.topLimit}px`;
		}

		setTranslate(translate);
	}, [direction, limits?.bottomLimit, limits?.topLimit, startPosition]);

	const getDuration = useCallback(() => {
		return translate !== '0' ? 0 : (startPosition !== null ? 100 : duration);
	}, [duration, startPosition, translate]);

	return {
		translate,
		getDuration,
		onTouchStartHandle: isSwipeDisabled ? undefined : onTouchStartHandle,
		onTouchEndHandle: isSwipeDisabled ? undefined : onTouchEndHandle,
		onTouchMoveHandle: isSwipeDisabled ? undefined : onTouchMoveHandle,
	};
};
