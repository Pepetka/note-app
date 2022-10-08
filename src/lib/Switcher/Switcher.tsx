import {classNames} from 'helpers/classNames/classNames';

import cls from './Switcher.module.scss';

interface SwitcherProps {
	className?: string
	isActive: boolean
	onclick: () => void
}

export const Switcher = ({className, isActive, onclick}: SwitcherProps) => {
	return (
		<span className={classNames([cls.Switcher, className], {[cls.active]: isActive})} onClick={onclick}/>
	);
};
