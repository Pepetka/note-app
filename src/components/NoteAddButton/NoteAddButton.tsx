import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {classNames} from 'helpers/classNames/classNames';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {memo} from 'react';

import cls from './NoteAddButton.module.scss';

interface NoteAddButtonProps {
	className?: string;
	onClick: () => void
}

export const NoteAddButton = memo(({className, onClick}: NoteAddButtonProps) => {
	return (
		<Button
			onClick={onClick}
			theme={ButtonThemes.SECONDARY}
			className={classNames([cls.NoteAddButton, className])}
			testid='NoteAddButton'
		>
			<div className={cls.add}>
				<FontAwesomeIcon icon={faPlus} />
			</div>
		</Button>
	);
});
