import {classNames} from 'shared/helpers/classNames/classNames';
import {CSSProperties, memo} from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
	/**
	 * Дополнительные классы
	 */
	className?: string
	/**
	 * Ширина компонента
	 */
	width: number | string
	/**
	 * Высота компонента
	 */
	height?: number | string
	/**
	 * Флаг, отвечающий за округление компонента
	 */
	circle?: boolean
	/**
	 * Значение скругления компонента
	 */
	border?: string
	/**
	 * Отступ компонента
	 */
	margin?: number
}

export const Skeleton = memo(
	({className, height, circle, width, border, margin}: SkeletonProps) => {
		const stiles: CSSProperties = {
			width: typeof width === 'number' ? width + 'px' : width,
			height: height ?
				typeof height === 'number' ? height + 'px' : height :
				typeof width === 'number' ? width + 'px' : width,
			borderRadius: border,
			margin,
		};

		return (
			<div style={stiles} className={classNames([cls.Skeleton, className], {[cls.circle]: circle})}/>
		);
	},
);
