import {NotesControlPanel} from 'components/NotesControlPanel/NotesControlPanel';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';
import {NoteAddForm} from 'components/NoteAddForm/NoteAddForm';
import {Loader} from 'components/Loader/Loader';
import {Notes} from 'components/Notes/Notes';
import {Filters} from 'components/Filters/Filters';
import {useTranslation} from 'react-i18next';
import {useHandleSort} from 'hooks/useHandleSort';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {fetchNotes} from 'store/slices/firebaseSlice';

export const HomePagetemplate = () => {
	const {handleSort} = useHandleSort();
	const {loading, notes, error} = useAppSelector((state) => state.firebase);
	const dispatch = useAppDispatch();
	const {t} = useTranslation('home');
	const userId = useAppSelector((state) => state.user.user.id);

	const onReload = () => {
		dispatch(fetchNotes(userId!));
	};

	return (
		<div id='homePage'>
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
