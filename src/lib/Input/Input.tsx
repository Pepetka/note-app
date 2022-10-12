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
	testid?: string
}
export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		testid,
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
			data-testid={testid ?? 'Input'}
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
