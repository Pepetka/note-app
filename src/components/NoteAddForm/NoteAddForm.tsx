import {ChangeEvent, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {alertActions} from 'store/model/alert/slice/alertSlice';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'shared/lib/Button/Button';
import {Input} from 'shared/lib/Input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {addNote} from 'store/model/notes/services/addNote/addNote';
import {AlertType} from 'store/model/alert/types/AlertSchema';

import cls from './NoteAddForm.module.scss';
import {HStack} from '../../shared/lib/Flex/HStack';

export const NoteAddForm = memo(() => {
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

	const onValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	}, []);

	const onChecked = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsChecked((isChecked) => !isChecked);
	}, []);

	const onShowAlert = useCallback((text: string, type: AlertType) => {
		dispatch(
			alertActions.showAlert({
				text,
				type,
			}),
		);

		timerRef.current = setTimeout(() => {
			dispatch(alertActions.hideAlert());
		}, 3000);
	}, [dispatch]);

	const submitHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (value.trim()) {
			dispatch(addNote({title: value.trim(), isImportant: isChecked}));
			setValue('');
			setIsChecked(false);
		} else {
			onShowAlert(t('Please enter a note title'), 'warning');
		}
	}, [dispatch, isChecked, onShowAlert, t, value]);

	return (
		<form data-testid='NoteAddForm'>
			<HStack>
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
			</HStack>
		</form>
	);
});
