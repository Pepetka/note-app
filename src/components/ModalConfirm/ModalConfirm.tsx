import {Modal} from 'lib/Modal/Modal';
import {DeleteNoteConfirm} from 'components/DeleteNoteConfirm/DeleteNoteConfirm';

interface ModalConfirmProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export const ModalConfirm = ({isOpen, onClose, onConfirm}: ModalConfirmProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<DeleteNoteConfirm onConfirm={onConfirm} onClose={onClose}/>
		</Modal>
	);
};
