import {ButtonHTMLAttributes, ForwardedRef, forwardRef, memo, ReactNode} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';
import {HStack} from 'shared/lib/Flex/HStack';

import cls from './Button.module.scss';

export enum ButtonThemes {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	CLEAR = 'clear',
	CIRCLE = 'circle'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	/**
	 * Дополнительные классы
	 */
	className?: string
	/**
	 * Флаг, отвечающий за смену стиля при выборе кнопки
	 */
	active?: boolean
	/**
	 * Содержимое кнопки
	 */
	children?: ReactNode
	/**
	 * Тема компонента
	 */
	theme: ButtonThemes
	/**
	 * Флаг, отвечающий за отсутствие скруглений углов компонента
	 */
	corners?: boolean
	/**
	 * Флаг, отвечающий за наличие границы справа и слева
	 */
	border?: boolean
	/**
	 * ID компонента при тестировании
	 */
	testid?: string
	/**
	 * Флаг, отвечающий за возможность занять 100% ширины контейнера
	 */
	w100?: boolean
}

export const Button = memo(forwardRef(( props : ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {
		className,
		testid,
		children,
		theme,
		onClick,
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
			onClick={onClick}
			{...otherProps}
		>
			<HStack w100 h100 justify='center' align='center'>
				{children}
			</HStack>
		</button>
	);
}));
