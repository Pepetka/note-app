import {ChangeEvent, HTMLInputTypeAttribute} from 'react';
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
export const Input = ({className, placeholder, onChange, value, id, withCorners = false, type = 'text', ...otherProps}: InputProps) => {
	return (
		<input
			value={value}
			onChange={(e) => onChange(e)}
			type={type}
			className={classNames([cls.Input, className], {[cls.withCorners]: withCorners})}
			placeholder={placeholder}
			id={id}
			{...otherProps}
		/>
	);
};
