import {ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef} from 'react';
import {classNames} from 'helpers/classNames/classNames';
import {Input} from 'lib/Input/Input';
import {Textarea} from 'lib/Textarea/Textarea';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'hooks/useRedux';
import {addNote} from 'store/model/notes/services/addNote/addNote';
import {useSelector} from 'react-redux';
import {getNoteFormTitle} from 'store/model/noteForm/selectors/getNoteFormTitle/getNoteFormTitle';
import {getNoteFormError} from 'store/model/noteForm/selectors/getNoteFormError/getNoteFormError';
import {getNoteFormContent} from 'store/model/noteForm/selectors/getNoteFormContent/getNoteFormContent';
import {noteFormActions, noteFormReducer} from 'store/model/noteForm/slice/noteFormSlice';
import {DynamicModuleLoader} from 'store/ui/DynamicModuleLoader/DynamicModuleLoader';

import cls from './NoteAddFormWithContent.module.scss';
import {VStack} from 'lib/Flex/VStack';

interface NoteAddFormWithContentProps {
	className?: string;
	optionFunc?: () => void
}

export const NoteAddFormWithContent = memo(({className, optionFunc}: NoteAddFormWithContentProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const title = useSelector(getNoteFormTitle);
	const error = useSelector(getNoteFormError);
	const content = useSelector(getNoteFormContent);
	const {t} = useTranslation('home');
	const dispatch = useAppDispatch();

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(noteFormActions.setTitle(event.target.value));
	}, [dispatch]);

	const onChangeContent = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(noteFormActions.setContent(event.target.value));
	}, [dispatch]);

	const onSubmit = useCallback((event: FormEvent) => {
		event.preventDefault();

		if (title) {
			dispatch(addNote({title, isImportant: false, content}));
			optionFunc?.();
		} else {
			dispatch(noteFormActions.setError('Please enter a note title'));
		}
	}, [content, dispatch, optionFunc, title]);

	return (
		<DynamicModuleLoader reducerKey='noteForm' reducer={noteFormReducer}>
			<form data-testid='NoteAddFormWithContent' onSubmit={onSubmit} className={classNames([cls.NoteAddFormWithContent, className])}>
				<VStack gap='8'>
					<h2 className={cls.title}>{t('Add note')}</h2>
					<Input data-testid floatPlaceholder={t('Note title')} value={title} onChange={onChangeTitle} ref={inputRef}/>
					{error && <p data-testid='NoteAddFormWithContent_error' className={cls.error}>{t(error)}</p>}
					<Textarea floatPlaceholder={t('Note content')} value={content} onChange={onChangeContent}/>
					<Button data-testid='NoteAddFormWithContent_btn' theme={ButtonThemes.PRIMARY} type='submit' className={cls.button}>
						{t('Add Note')}
					</Button>
				</VStack>
			</form>
		</DynamicModuleLoader>
	);
});
