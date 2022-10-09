import {useEffect} from 'react';
import {fetchNotes} from 'store/notes/slice/notesSlice';
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
import {useAppSelector, useAppDispatch} from 'hooks/useRedux';
import {getUser} from 'store/user/selectors/getUser/getUser';

export const HomePage = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(getUser).id;
	const navigate = useNavigate();
	const {isAuth} = useAuth();
	const {handleSort} = useHandleSort();
	const {loading, notes, error} = useAppSelector(getNotesState);
	const {t} = useTranslation('home');

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchNotes(userId!));
		} else if (localStorage.getItem('user') !== null) {
			const user = localStorage.getItem('user');
			dispatch(userActions.setUser(JSON.parse(user!)));
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

	return (
		<div data-testid='HomePage'>
			<h1>{t('Home Page')}</h1>
			<NoteAddForm />
			<NotesControlPanel notesLength={notes.length} />
			<Filters />
			{error.get ? (
				<ReloadTemplate onReload={onReload} />
			) : loading ? <Loader /> : <Notes handleSort={handleSort} />}
		</div>
	);
};
