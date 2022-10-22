import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'hooks/useAuth';
import {userActions} from 'store/user/slice/userSlice';
import {alertActions} from 'store/alert/slice/alertSlice';
import {NoteAddForm} from 'components/NoteAddForm/NoteAddForm';
import {NotesControlPanel} from 'components/NotesControlPanel/NotesControlPanel';
import {Filters} from 'components/Filters/Filters';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';
import {Loader} from 'lib/Loader/Loader';
import {Notes} from 'components/Notes/Notes';
import {useHandleSort} from 'hooks/useHandleSort';
import {getNotesState} from 'store/notes/selectors/getState/getNotesState';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from 'hooks/useRedux';
import {getUser} from 'store/user/selectors/getUser/getUser';
import {fetchNotes} from 'store/notes/services/fetchNotes/fetchNotes';
import {NoteAddButton} from 'components/NoteAddButton/NoteAddButton';
import {ModalNoteAdd} from 'components/ModalNoteAdd/ModalNoteAdd';
import {LocalStorageKeys} from 'const/localStorage';
import {useSelector} from 'react-redux';

export const HomePage = () => {
	const dispatch = useAppDispatch();
	const userId = useSelector(getUser)?.id;
	const navigate = useNavigate();
	const {isAuth} = useAuth();
	const {handleSort} = useHandleSort();
	const {loading, notes, error} = useSelector(getNotesState);
	const {t} = useTranslation('home');
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchNotes(userId!));
		} else if (localStorage.getItem(LocalStorageKeys.USER)) {
			dispatch(userActions.initUser());
		} else {
			navigate('/login');
		}
	}, [dispatch, isAuth, navigate, userId]);

	useEffect(() => {
		if (error.update) dispatch(alertActions.showAlert({type: 'danger', text: error.update}));
	}, [dispatch, error.update]);

	const onReload = () => {
		dispatch(fetchNotes(userId!));
	};

	const onOpenModal = () => {
		setIsOpenModal(true);
	};

	const onCloseModal = () => {
		setIsOpenModal(false);
	};

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
};
