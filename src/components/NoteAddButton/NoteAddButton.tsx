import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {classNames} from 'shared/helpers/classNames/classNames';
import {Button, ButtonThemes} from 'shared/lib/Button/Button';
import {memo, useCallback, useState} from 'react';
import {HStack} from 'shared/lib/Flex/HStack';
import {Popover} from 'shared/lib/Popover/Popover';
import {useTranslation} from 'react-i18next';
import {ModalNoteAdd} from 'components/ModalNoteAdd/ModalNoteAdd';

import cls from './NoteAddButton.module.scss';

interface NoteAddButtonProps {
	className?: string;
}

export const NoteAddButton = memo(({className}: NoteAddButtonProps) => {
	const {t} = useTranslation('home');
	const [isOpenModal, setIsOpenModal] = useState(false);

	const onOpenModal = useCallback(() => {
		setIsOpenModal(true);
	}, []);

	const onCloseModal = useCallback(() => {
		setIsOpenModal(false);
	}, []);

	return (
		<>
			<Popover
				w100
				popoverContent={t('Add note')}
				position='top'
			>
				<Button
					onClick={onOpenModal}
					theme={ButtonThemes.SECONDARY}
					className={classNames([cls.NoteAddButton, className])}
					testid='NoteAddButton'
				>
					<HStack justify='center' align='center' className={cls.add}>
						<FontAwesomeIcon icon={faPlus}/>
					</HStack>
				</Button>
			</Popover>
			<ModalNoteAdd isOpen={isOpenModal} onClose={onCloseModal}/>
		</>
	);
});
