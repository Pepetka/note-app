import {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	HTMLInputTypeAttribute,
	InputHTMLAttributes, memo,
	useEffect,
	useState,
} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';

import cls from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	placeholder?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	value?: string
	type?: HTMLInputTypeAttribute
	id?: string
	withCorners?: boolean
	testid?: string
	floatPlaceholder?: string
}
export const Input = memo(forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		testid,
		className,
		floatPlaceholder,
		placeholder,
		onChange,
		value,
		id,
		withCorners = false,
		type = 'text',
		...otherProps
	} = props;
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (value) setIsFocused(true);
	}, [value]);

	const onFocus = () => {
		setIsFocused(true);
	};

	const onBlur = () => {
		if (!value) setIsFocused(false);
	};

	return (
		<div
			data-testid='Input_wrapper'
			className={classNames([cls.inputWrapper], {[cls.withPlaceholder]: !!floatPlaceholder})}
		>
			{!!floatPlaceholder && <span
				data-testid='Input_floatPlaceholder'
				className={classNames([cls.placeholder], {[cls.focused]: isFocused})}
			>
				{floatPlaceholder}
			</span>}
			<input
				ref={ref}
				value={value}
				onChange={onChange}
				type={type}
				onFocus={onFocus}
				onBlur={onBlur}
				data-testid={testid ?? 'Input'}
				className={classNames([cls.Input, className], {[cls.withCorners]: withCorners})}
				placeholder={placeholder}
				id={id}
				{...otherProps}
			/>
		</div>
	);
}));
