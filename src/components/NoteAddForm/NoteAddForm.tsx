import {ChangeEvent, MouseEvent, useState} from 'react';
import {showAlert, hideAlert} from 'store/slices/alertSlice';
import {addNote} from 'store/slices/firebaseSlice';
import {useAppDispatch} from 'hooks/useRedux';
import {useTranslation} from 'react-i18next';

import './NoteAddForm.scss';

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
		<form className='noteAddForm'>
			<input
				value={value}
				onChange={(e) => onValueChange(e)}
				type='text'
				className='input noteAddForm__input'
				placeholder={t('Enter note title')}
			/>
			<button
				onClick={(e) => onChecked(e)}
				className={`button noteAddForm__important ${
					isChecked ? 'noteAddForm__important_active' : ''
				}`}
				type='button'
			>
				<i className="fa-solid fa-exclamation"></i>
			</button>
			<button
				onClick={(e) => submitHandler(e)}
				className='button noteAddForm__button'
				type='submit'
			>
				{t('Add Note')}
			</button>
		</form>
	);
};
