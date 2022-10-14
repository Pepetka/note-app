import {classNames} from 'helpers/classNames/classNames';
import {Modal} from 'lib/Modal/Modal';
import {NoteAddFormWithContent} from 'components/NoteAddFormWithContent/NoteAddFormWithContent';

interface ModalNoteAddProps {
	className?: string;
	isOpen: boolean
	onClose: () => void
}

export const ModalNoteAdd = ({className, isOpen, onClose}: ModalNoteAddProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className={classNames([className])}>
			<NoteAddFormWithContent optionFunc={onClose}/>
		</Modal>
	);
};
