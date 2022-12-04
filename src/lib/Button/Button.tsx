import {ButtonHTMLAttributes, ForwardedRef, forwardRef, memo, MouseEvent, ReactNode} from 'react';
import {classNames} from 'helpers/classNames/classNames';

import cls from './Button.module.scss';
import {HStack} from '../Flex/HStack';

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
	w100?: boolean
}

export const Button = memo(forwardRef(( props : ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
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
		w100,
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
					{[cls.active]: active, [cls.withoutCorners]: !corners, [cls.withoutBorders]: !border, [cls.w100]: w100})
			}
			onClick={(e) => onClick(e)}
			{...otherProps}
		>
			<HStack w100 h100 justify='center' align='center'>
				{children}
			</HStack>
		</button>
	);
}));
