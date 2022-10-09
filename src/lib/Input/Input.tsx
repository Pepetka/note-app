import {ChangeEvent, ForwardedRef, forwardRef, HTMLInputTypeAttribute} from 'react';
import {classNames} from 'helpers/classNames/classNames';

import cls from './Input.module.scss';

interface InputProps {
	className?: string
	placeholder?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	value?: string
	type?: HTMLInputTypeAttribute
	id?: string
	withCorners?: boolean
}
export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		placeholder,
		onChange,
		value,
		id,
		withCorners = false,
		type = 'text',
		...otherProps
	} = props;

	return (
		<input
			data-testid='Input'
			ref={ref}
			value={value}
			onChange={onChange}
			type={type}
			className={classNames([cls.Input, className], {[cls.withCorners]: withCorners})}
			placeholder={placeholder}
			id={id}
			{...otherProps}
		/>
	);
},
);
