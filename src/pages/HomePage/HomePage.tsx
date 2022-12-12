import {memo, useCallback, useEffect} from 'react';
import {alertActions} from 'store/model/alert/slice/alertSlice';
import {NoteAddForm} from 'components/NoteAddForm/NoteAddForm';
import {NotesControlPanel} from 'components/NotesControlPanel/NotesControlPanel';
import {Filters} from 'components/Filters/Filters';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';
import {Notes} from 'components/Notes/Notes';
import {useHandleSort} from 'shared/hooks/useHandleSort';
import {getNotesState} from 'store/model/notes/selectors/getState/getNotesState';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'shared/hooks/useRedux';
import {getUser} from 'store/model/user/selectors/getUser/getUser';
import {fetchNotes} from 'store/model/notes/services/fetchNotes/fetchNotes';
import {NoteAddButton} from 'components/NoteAddButton/NoteAddButton';
import {useSelector} from 'react-redux';
import {useAuth} from 'shared/hooks/useAuth';
import {getInit} from 'store/model/user/selectors/getInit/getInit';

export const HomePage = memo(() => {
	const dispatch = useAppDispatch();
	const {isAuth} = useAuth();
	const userData = useSelector(getUser);
	const _init = useSelector(getInit);
	const {handleSort} = useHandleSort();
	const {notes, error} = useSelector(getNotesState);
	const {t} = useTranslation('home');

	useEffect(() => {
		if (!_init) return;

		if (isAuth) {
			dispatch(fetchNotes(userData!.id));
		}
	}, [_init, dispatch, isAuth, userData]);

	useEffect(() => {
		if (error.update) dispatch(alertActions.showAlert({type: 'danger', text: error.update}));
	}, [dispatch, error.update]);

	const onReload = useCallback(() => {
		dispatch(fetchNotes(userData!.id));
	}, [dispatch, userData]);

	return (
		<>
			<div data-testid='HomePage'>
				<h1>{t('Home Page')}</h1>
				<NoteAddForm />
				<NotesControlPanel notesLength={notes.length} />
				<Filters />
				{
					error.get ?
						<ReloadTemplate onReload={onReload} /> :
						<Notes handleSort={handleSort}/>
				}
				<NoteAddButton />
			</div>
		</>
	);
});
