import {memo} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
	/**
	 * Дополнительные классы
	 */
	className?: string
	/**
	 * Функция, вызываемая при клике на компонент
	 */
	onClick?: () => void
}

export const Overlay = memo(
	({className, onClick}: OverlayProps) => {
		return (
			<div className={classNames([cls.Overlay, className])} onClick={onClick}/>
		);
	},
);
