import {classNames} from 'shared/helpers/classNames/classNames';
import {memo} from 'react';

import cls from './Switcher.module.scss';

interface SwitcherProps {
	className?: string
	isActive?: boolean
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
