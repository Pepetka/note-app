import {memo, useCallback, useEffect, useState} from 'react';
import {alertActions} from 'store/model/alert/slice/alertSlice';
import {NoteAddForm} from 'components/NoteAddForm/NoteAddForm';
import {NotesControlPanel} from 'components/NotesControlPanel/NotesControlPanel';
import {Filters} from 'components/Filters/Filters';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';
import {Loader} from 'lib/Loader/Loader';
import {Notes} from 'components/Notes/Notes';
import {useHandleSort} from 'hooks/useHandleSort';
import {getNotesState} from 'store/model/notes/selectors/getState/getNotesState';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'hooks/useRedux';
import {getUser} from 'store/model/user/selectors/getUser/getUser';
import {fetchNotes} from 'store/model/notes/services/fetchNotes/fetchNotes';
import {NoteAddButton} from 'components/NoteAddButton/NoteAddButton';
import {ModalNoteAdd} from 'components/ModalNoteAdd/ModalNoteAdd';
import {useSelector} from 'react-redux';
import {useAuth} from 'hooks/useAuth';
import {useNavigate} from 'react-router-dom';
import {LocalStorageKeys} from 'const/localStorage';

export const HomePage = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {isAuth} = useAuth();
	const userId = useSelector(getUser)?.id;
	const {handleSort} = useHandleSort();
	const {loading, notes, error} = useSelector(getNotesState);
	const {t} = useTranslation('home');
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		if (isAuth || localStorage.getItem(LocalStorageKeys.USER)) {
			dispatch(fetchNotes(userId!));
		} else {
			navigate('/login');
		}
	}, [dispatch, isAuth, navigate, userId]);

	useEffect(() => {
		if (error.update) dispatch(alertActions.showAlert({type: 'danger', text: error.update}));
	}, [dispatch, error.update]);

	const onReload = useCallback(() => {
		dispatch(fetchNotes(userId!));
	}, [dispatch, userId]);

	const onOpenModal = useCallback(() => {
		setIsOpenModal(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpenModal(false);
	}, []);

	return (
		<>
			<div data-testid='HomePage'>
				<h1>{t('Home Page')}</h1>
				<NoteAddForm />
				<NotesControlPanel notesLength={notes.length} />
				<Filters />
				{error.get ? (
					<ReloadTemplate onReload={onReload} />
				) : loading ? <Loader /> : <>
					<Notes handleSort={handleSort}/>
					<NoteAddButton onClick={onOpenModal} />
				</>}
			</div>
			<ModalNoteAdd isOpen={isOpenModal} onClose={onCloseModal}/>
		</>
	);
});
