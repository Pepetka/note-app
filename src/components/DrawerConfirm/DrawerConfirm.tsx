import {memo} from 'react';
import {DeleteNoteConfirm} from 'components/DeleteNoteConfirm/DeleteNoteConfirm';
import {Drawer} from 'shared/lib/Drawer/Drawer';

interface DrawerConfirmProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export const DrawerConfirm = memo(({isOpen, onClose, onConfirm}: DrawerConfirmProps) => {
	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			<DeleteNoteConfirm onConfirm={onConfirm} onClose={onClose}/>
		</Drawer>
	);
});
