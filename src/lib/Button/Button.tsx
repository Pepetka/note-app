import {ButtonHTMLAttributes, ForwardedRef, forwardRef, MouseEvent, ReactNode} from 'react';
import {classNames} from 'helpers/classNames/classNames';

import cls from './Button.module.scss';

export enum ButtonThemes {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	CLEAR = 'clear',
	CIRCLE = 'circle'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	className?: string
	active?: boolean
	type?: 'submit' | 'reset' | 'button' | undefined
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
	children?: ReactNode
	theme: ButtonThemes
	corners?: boolean
	border?: boolean
	testid?: string
}

export const Button = forwardRef(( props : ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {
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
	} = props;

	return (
		<button
			ref={ref}
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
});
