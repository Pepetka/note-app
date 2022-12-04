import {Button, ButtonThemes} from 'lib/Button/Button';
import {useTranslation} from 'react-i18next';
import {classNames} from 'helpers/classNames/classNames';
import {memo, useEffect, useRef} from 'react';
import {VStack} from 'lib/Flex/VStack';
import {HStack} from 'lib/Flex/HStack';

interface DeleteNoteConfirmProps {
	className?: string;
	onConfirm: () => void
	onClose: () => void
}

export const DeleteNoteConfirm = memo(({className, onConfirm, onClose}: DeleteNoteConfirmProps) => {
	const {t} = useTranslation();
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		btnRef.current?.focus();
	}, []);

	return (
		<VStack align='center' gap='24' data-testid='DeleteNoteConfirm' className={classNames([className])}>
			<p>
				{t('Delete note? Are you sure?')}
			</p>
			<HStack gap='24'>
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
			</HStack>
		</VStack>
	);
});
