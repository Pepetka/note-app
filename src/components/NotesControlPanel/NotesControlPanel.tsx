import {useTranslation} from 'react-i18next';
import './NotesControlPanel.scss';
import {useHandleSort} from 'hooks/useHandleSort';

interface NotesControlPanelProps {
	notesLength: number
}
export const NotesControlPanel = ({notesLength}: NotesControlPanelProps) => {
	const {t} = useTranslation('home');
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<div className='controlPanel'>
			<div className='controlPanel__notesNumber'>{t('Number of notes')} {notesLength}</div>
			<div className='controlPanel__wrapper'>
				<label className='controlPanel__label' onClick={onHandleSort}>
					{t('Handle Sort')}
				</label>
				<span className={`controlPanel__switcher ${handleSort ? 'controlPanel__switcher_active' : ''}`} onClick={onHandleSort}/>
			</div>
		</div>
	);
};
