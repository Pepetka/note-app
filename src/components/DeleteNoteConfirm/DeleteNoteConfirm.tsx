import {Button, ButtonThemes} from 'lib/Button/Button';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';

import cls from './DeleteNoteConfirm.module.scss';
import {useEffect, useRef} from 'react';

interface DeleteNoteConfirmProps {
	className?: string;
	onConfirm: () => void
	onClose: () => void
}

export const DeleteNoteConfirm = ({className, onConfirm, onClose}: DeleteNoteConfirmProps) => {
	const {t} = useTranslation();
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		btnRef.current?.focus();
	}, []);

	return (
		<div data-testid='DeleteNoteConfirm' className={classNames([cls.DeleteNoteConfirm, className])}>
			<p>
				{t('Delete note? Are you sure?')}
			</p>
			<div className={cls.control}>
				<Button
					ref={btnRef}
					theme={ButtonThemes.PRIMARY}
					onClick={onConfirm}
				>
					{t('Delete')}
				</Button>
				<Button
					theme={ButtonThemes.PRIMARY}
					onClick={onClose}
				>
					{t('Close')}
				</Button>
			</div>
		</div>
	);
};
