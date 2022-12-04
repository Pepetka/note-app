import {useTranslation} from 'react-i18next';
import {useHandleSort} from 'hooks/useHandleSort';
import {Switcher} from 'lib/Switcher/Switcher';
import {memo} from 'react';
import {HStack} from 'lib/Flex/HStack';

import cls from './NotesControlPanel.module.scss';

interface NotesControlPanelProps {
	notesLength: number
}
export const NotesControlPanel = memo(({notesLength}: NotesControlPanelProps) => {
	const {t} = useTranslation('home');
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<HStack justify='between' className={cls.ControlPanel} data-testid='NotesControlPanel'>
			<div>{t('Number of notes')} <span>{notesLength}</span></div>
			<HStack gap='8'>
				<label data-testid='NotesControlPanel_label' onClick={onHandleSort}>
					{t('Handle Sort')}
				</label>
				<Switcher isActive={handleSort} onclick={onHandleSort} />
			</HStack>
		</HStack>
	);
});
