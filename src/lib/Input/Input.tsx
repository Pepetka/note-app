import {ChangeEvent, ForwardedRef, forwardRef, HTMLInputTypeAttribute} from 'react';
import {classNames} from 'helpers/classNames/classNames';

import cls from './Input.module.scss';

interface InputProps {
	className?: string
	placeholder?: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
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
			ref={ref}
			value={value}
			onChange={(e) => onChange(e)}
			type={type}
			className={classNames([cls.Input, className], {[cls.withCorners]: withCorners})}
			placeholder={placeholder}
			id={id}
			{...otherProps}
		/>
	);
},
);
