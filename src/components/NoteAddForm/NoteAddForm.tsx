import {ChangeEvent, MouseEvent, useState} from 'react';
import {hideAlert, showAlert} from 'store/slices/alertSlice';
import {addNote} from 'store/slices/firebaseSlice';
import {useAppDispatch} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'components/lib/Button/Button';
import {Input} from 'components/lib/Input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';

import cls from './NoteAddForm.module.scss';

export const NoteAddForm = () => {
	const [value, setValue] = useState('');
	const dispatch = useAppDispatch();
	const [isChecked, setIsChecked] = useState(false);
	const {t} = useTranslation('home');

	const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onChecked = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsChecked((isChecked) => !isChecked);
	};

	const onShowAlert = (text: string, type: string) => {
		dispatch(
			showAlert({
				text,
				type,
			}),
		);

		setTimeout(() => {
			dispatch(hideAlert());
		}, 3000);
	};

	const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (value.trim()) {
			dispatch(addNote({title: value.trim(), isImportant: isChecked}));
			setValue('');
			setIsChecked(false);
		} else {
			onShowAlert('Enter note title', 'warning');
		}
	};

	return (
		<form className={cls.NoteAddForm}>
			<Input
				value={value}
				onChange={onValueChange}
				className={cls.input}
				placeholder={t('Enter note title')}
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
			>
				{t('Add Note')}
			</Button>
		</form>
	);
};
