import {useTranslation} from 'react-i18next';
import {useHandleSort} from 'hooks/useHandleSort';
import {classNames} from 'helpers/classNames';

import cls from './NotesControlPanel.module.scss';

interface NotesControlPanelProps {
	notesLength: number
}
export const NotesControlPanel = ({notesLength}: NotesControlPanelProps) => {
	const {t} = useTranslation('home');
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<div className={cls.ControlPanel}>
			<div>{t('Number of notes')} {notesLength}</div>
			<div className={cls.wrapper}>
				<label onClick={onHandleSort}>
					{t('Handle Sort')}
				</label>
				<span className={classNames([cls.switcher], {[cls.active]: handleSort})} onClick={onHandleSort}/>
			</div>
		</div>
	);
};
