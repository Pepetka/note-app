import {MouseEvent, ReactNode} from 'react';
import {classNames} from 'helpers/classNames/classNames';

import cls from './Button.module.scss';

export enum ButtonThemes {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	CLEAR = 'clear',
	CIRCLE = 'circle'
}

interface ButtonProps {
	className?: string
	active?: boolean
	type?: 'button' | 'submit' | 'reset'
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	children?: ReactNode
	theme: ButtonThemes
	corners?: boolean
	border?: boolean
	testid?: string
}
export const Button = (
	{
		className,
		testid,
		children,
		theme,
		onClick = () => {},
		active = false,
		corners = false,
		border = true,
		type = 'button',
		...otherProps
	}: ButtonProps) => {
	return (
		<button
			data-testid={testid ?? `Button-${theme}`}
			type={type}
			className={
				classNames(
					[cls.Button, cls[theme], className],
					{[cls.active]: active, [cls.withoutCorners]: !corners, [cls.withoutBorders]: !border})
			}
			onClick={(e) => onClick(e)}
			{...otherProps}
		>
			{children}
		</button>
	);
};
