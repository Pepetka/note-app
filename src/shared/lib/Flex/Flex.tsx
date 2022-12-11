import {ForwardedRef, forwardRef, HTMLAttributes, ReactNode} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';
import cls from './Flex.module.scss';

type FlexJustify = 'center' | 'between' | 'around' | 'start' | 'end';
type FlexAlign = 'center' | 'start' | 'end';
type FlexGap = '0' | '8' | '16' | '24' | '32';
type FlexDirection = 'row' | 'column';

export interface FlexProps extends HTMLAttributes<HTMLDivElement>{
	className?: string
	children: ReactNode
	w100?: boolean
	h100?: boolean
	justify?: FlexJustify
	align?: FlexAlign
	gap?: FlexGap
	direction?: FlexDirection
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
