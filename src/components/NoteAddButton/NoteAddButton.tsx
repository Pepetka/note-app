import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {classNames} from 'helpers/classNames/classNames';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {memo} from 'react';
import {HStack} from 'lib/Flex/HStack';
import {Popover} from 'lib/Popover/Popover';
import {useTranslation} from 'react-i18next';

import cls from './NoteAddButton.module.scss';

interface NoteAddButtonProps {
	className?: string;
	onClick: () => void
}

export const NoteAddButton = memo(({className, onClick}: NoteAddButtonProps) => {
	const {t} = useTranslation('home');

	return (
		<Popover
			w100
			popoverContent={t('Add note')}
			position='top'
		>
			<Button
				onClick={onClick}
				theme={ButtonThemes.SECONDARY}
				className={classNames([cls.NoteAddButton, className])}
				testid='NoteAddButton'
			>
				<HStack justify='center' align='center' className={cls.add}>
					<FontAwesomeIcon icon={faPlus} />
				</HStack>
			</Button>
		</Popover>
	);
});
