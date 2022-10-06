import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {NoteAddForm} from 'components/NoteAddForm/NoteAddForm';
import {Loader} from 'components/Loader/Loader';
import {Notes} from 'components/Notes/Notes';
import {fetchNotes} from 'store/slices/firebaseSlice';
import {Filters} from 'components/Filters/Filters';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'hooks/useAuth';
import {setUser} from 'store/slices/userSlice';
import {showAlert} from 'store/slices/alertSlice';
import {NotesControlPanel} from 'components/NotesControlPanel/NotesControlPanel';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';
import {useTranslation} from 'react-i18next';
import {useHandleSort} from 'hooks/useHandleSort';

export const HomePage = () => {
	const {handleSort} = useHandleSort();
	const dispatch = useAppDispatch();
	const {loading, notes, error} = useAppSelector((state) => state.firebase);
	const userId = useAppSelector((state) => state.user.user.id);
	const navigate = useNavigate();
	const {isAuth} = useAuth();
	const {t} = useTranslation('home');

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchNotes(userId!));
		} else if (localStorage.getItem('user') !== null) {
			const user = localStorage.getItem('user');
			dispatch(setUser(JSON.parse(user!)));
		} else {
			navigate('/login', {replace: true});
		}
	}, [dispatch, isAuth, navigate, userId]);

	useEffect(() => {
		if (error.update) dispatch(showAlert({type: 'danger', text: error.update}));
	}, [dispatch, error.update]);

	const onReload = () => {
		dispatch(fetchNotes(userId!));
	};

	return (
		<div id='homePage'>
			<h1>{t('Home Page')}</h1>
			<NoteAddForm />
			<NotesControlPanel notesLength={notes.length}/>
			<Filters />
			{error.get ? (
				<ReloadTemplate onReload={onReload}/>
			) : loading ? <Loader /> : <Notes handleSort={handleSort} />}
		</div>
	);
};
