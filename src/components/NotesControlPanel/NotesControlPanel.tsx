import {useTranslation} from 'react-i18next';
import {useHandleSort} from 'hooks/useHandleSort';
import {Switcher} from 'lib/Switcher/Switcher';

import cls from './NotesControlPanel.module.scss';

interface NotesControlPanelProps {
	notesLength: number
}
export const NotesControlPanel = ({notesLength}: NotesControlPanelProps) => {
	const {t} = useTranslation('home');
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<div className={cls.ControlPanel} data-testid='NotesControlPanel'>
			<div>{t('Number of notes')} {notesLength}</div>
			<div className={cls.wrapper}>
				<label onClick={onHandleSort}>
					{t('Handle Sort')}
				</label>
				<Switcher isActive={handleSort} onclick={onHandleSort} />
			</div>
		</div>
	);
};
