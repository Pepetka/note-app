import {ForwardedRef, forwardRef, HTMLAttributes, ReactNode} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';
import cls from './Flex.module.scss';

type FlexJustify = 'center' | 'between' | 'around' | 'start' | 'end';
type FlexAlign = 'center' | 'start' | 'end';
type FlexGap = '0' | '8' | '16' | '24' | '32';
type FlexDirection = 'row' | 'column';

export interface FlexProps extends HTMLAttributes<HTMLDivElement>{
	/**
	 * Дополнительные классы
	 */
	className?: string
	/**
	 * Содержимое компонента
	 */
	children: ReactNode
	/**
	 * Флаг, отвечающий за возможность занять 100% ширины контейнера
	 */
	w100?: boolean
	/**
	 * Флаг, отвечающий за возможность занять 100% высоты контейнера
	 */
	h100?: boolean
	/**
	 * Пропс, отвечающий за значение свойства justify-content
	 */
	justify?: FlexJustify
	/**
	 * Пропс, отвечающий за значение свойства align-items
	 */
	align?: FlexAlign
	/**
	 * Пропс, отвечающий за значение свойства gap
	 */
	gap?: FlexGap
	/**
	 * Пропс, отвечающий за значение свойства flex-direction
	 */
	direction?: FlexDirection
	/**
	 * ID компонента при тестировании
	 */
	'data-testid'?: string
}

export const Flex = forwardRef(({
	className,
	children,
	w100,
	h100,
	align = 'start',
	justify = 'start',
	gap = '0',
	direction = 'row',
	'data-testid': dataTestId,
	...otherProp
}: FlexProps, ref?: ForwardedRef<HTMLDivElement>) => {
	const flexClasses = [
		cls.Flex,
		cls['justify_' + justify],
		cls['align_' + align],
		cls['gap_' + gap],
		cls[direction],
		className,
	];

	return (
		<div ref={ref} {...otherProp} data-testid={dataTestId} className={classNames(flexClasses, {[cls.w100]: w100, [cls.h100]: h100})}>
			{children}
		</div>
	);
});
