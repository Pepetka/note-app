import {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {classNames} from 'helpers/classNames/classNames';
import {Input} from 'lib/Input/Input';
import {Textarea} from 'lib/Textarea/Textarea';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'hooks/useRedux';
import {addNote} from 'store/notes/services/addNote/addNote';

import cls from './NoteAddFormWithContent.module.scss';

interface NoteAddFormWithContentProps {
	className?: string;
	optionFunc?: () => void
}

export const NoteAddFormWithContent = ({className, optionFunc}: NoteAddFormWithContentProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	const [content, setContent] = useState('');
	const {t} = useTranslation('home');
	const dispatch = useAppDispatch();

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
		setError('');
	};

	const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	};

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();

		if (title) {
			dispatch(addNote({title, isImportant: false, content}));
			optionFunc?.();
		} else {
			setError('Please enter a note title');
		}
	};

	return (
		<form onSubmit={onSubmit} className={classNames([cls.NoteAddFormWithContent, className])}>
			<h2 className={cls.title}>{t('Add note')}</h2>
			<Input floatPlaceholder={t('Note title')} value={title} onChange={onChangeTitle} ref={inputRef}/>
			{error && <p className={cls.error}>{t(error)}</p>}
			<Textarea floatPlaceholder={t('Note content')} value={content} onChange={onChangeContent}/>
			<Button theme={ButtonThemes.PRIMARY} type='submit' className={cls.button}>
				{t('Add Note')}
			</Button>
		</form>
	);
};
