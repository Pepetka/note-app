import {ChangeEvent, ForwardedRef, forwardRef, memo, TextareaHTMLAttributes, useEffect, useState} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';

import cls from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
	className?: string
	placeholder?: string
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	value?: string
	id?: string
	withCorners?: boolean
	testid?: string
	rows?: number
	floatPlaceholder?: string
}
export const Textarea = memo(forwardRef((props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
	const {
		testid,
		className,
		floatPlaceholder,
		rows = 5,
		placeholder,
		onChange,
		value,
		id,
		withCorners = false,
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
			data-testid='Textarea_wrapper'
			className={classNames([cls.textareaWrapper], {[cls.withPlaceholder]: !!floatPlaceholder})}
		>
			{!!floatPlaceholder && <span
				data-testid='Textarea_floatPlaceholder'
				className={classNames([cls.placeholder], {[cls.focused]: isFocused})}
			>
				{floatPlaceholder}
			</span>}
			<textarea
				ref={ref}
				rows={rows}
				value={value}
				data-testid={testid ?? 'Textarea'}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				className={classNames([cls.Textarea, className], {[cls.withCorners]: withCorners})}
				placeholder={placeholder}
				id={id}
				{...otherProps}
			/>
		</div>
	);
}));
