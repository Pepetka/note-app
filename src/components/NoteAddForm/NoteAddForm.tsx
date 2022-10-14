import {ChangeEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import {alertActions} from 'store/alert/slice/alertSlice';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {Input} from 'lib/Input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch} from 'hooks/useRedux';
import {addNote} from 'store/notes/services/addNote/addNote';
import {AlertType} from 'store/alert/types/AlertSchema';

import cls from './NoteAddForm.module.scss';

export const NoteAddForm = () => {
	const [value, setValue] = useState('');
	const dispatch = useAppDispatch();
	const [isChecked, setIsChecked] = useState(false);
	const {t} = useTranslation('home');
	const inputRef = useRef<HTMLInputElement>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		inputRef.current?.focus();

		return () => {
			clearTimeout(timerRef.current);
		};
	}, []);

	const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onChecked = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsChecked((isChecked) => !isChecked);
	};

	const onShowAlert = (text: string, type: AlertType) => {
		dispatch(
			alertActions.showAlert({
				text,
				type,
			}),
		);

		timerRef.current = setTimeout(() => {
			dispatch(alertActions.hideAlert());
		}, 3000);
	};

	const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (value.trim()) {
			dispatch(addNote({title: value.trim(), isImportant: isChecked}));
			setValue('');
			setIsChecked(false);
		} else {
			onShowAlert(t('Please enter a note title'), 'warning');
		}
	};

	return (
		<form className={cls.NoteAddForm} data-testid='NoteAddForm'>
			<Input
				value={value}
				onChange={onValueChange}
				placeholder={t('Enter note title')}
				withCorners
				ref={inputRef}
			/>
			<Button
				onClick={onChecked}
				className={cls.important}
				corners
				border={false}
				active={isChecked}
				theme={ButtonThemes.SECONDARY}
				type='button'
			>
				<FontAwesomeIcon icon={faExclamation} />
			</Button>
			<Button
				onClick={submitHandler}
				className={cls.button}
				corners
				theme={ButtonThemes.PRIMARY}
				type='submit'
				testid='NoteAddForm_btn'
			>
				{t('Add Note')}
			</Button>
		</form>
	);
};
