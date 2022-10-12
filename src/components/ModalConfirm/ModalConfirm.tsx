import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {Modal} from 'lib/Modal/Modal';

import cls from './ModalConfirm.module.scss';

interface ModalConfirmProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export const ModalConfirm = ({isOpen, onClose, onConfirm}: ModalConfirmProps) => {
	const {t} = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div data-testid='ModalConfirm' className={cls.content}>
				<p>
					{t('Delete note? Are you sure?')}
				</p>
				<div className={cls.control}>
					<Button
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
		</Modal>
	);
};
