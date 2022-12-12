import {memo} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';
import {NoteAddFormWithContent} from 'components/NoteAddFormWithContent/NoteAddFormWithContent';
import {Drawer} from 'shared/lib/Drawer/Drawer';

interface DrawerNoteAddProps {
	className?: string;
	isOpen: boolean
	onClose: () => void
}

export const DrawerNoteAdd = memo(
	({className, isOpen, onClose}: DrawerNoteAddProps) => {
		return (
			<Drawer isOpen={isOpen} onClose={onClose} className={classNames([className])}>
				<NoteAddFormWithContent optionFunc={onClose}/>
			</Drawer>
		);
	},
);
