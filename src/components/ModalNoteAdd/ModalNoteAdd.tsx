import {classNames} from 'shared/helpers/classNames/classNames';
import {Modal} from 'shared/lib/Modal/Modal';
import {NoteAddFormWithContent} from 'components/NoteAddFormWithContent/NoteAddFormWithContent';
import {memo} from 'react';

interface ModalNoteAddProps {
	className?: string;
	isOpen: boolean
	onClose: () => void
}

export const ModalNoteAdd = memo(({className, isOpen, onClose}: ModalNoteAddProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className={classNames([className])}>
			<NoteAddFormWithContent optionFunc={onClose}/>
		</Modal>
	);
});
