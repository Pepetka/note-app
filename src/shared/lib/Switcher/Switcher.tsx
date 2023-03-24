import {classNames} from 'shared/helpers/classNames/classNames';
import {memo} from 'react';

import cls from './Switcher.module.scss';

interface SwitcherProps {
	/**
	 * Дополнительные классы
	 */
	className?: string
	/**
	 * Флаг, отвечающий за то, в каком положении находится компонент
	 */
	isActive?: boolean
	/**
	 * Функция, вызываемая при клике на компонент
	 */
	onclick?: () => void
}

export const Switcher = memo(({className, onclick, isActive = false}: SwitcherProps) => {
	return (
		<span
			className={classNames([cls.Switcher, className], {[cls.active]: isActive})}
			onClick={onclick}
			data-testid='Switcher'
		/>
	);
});
