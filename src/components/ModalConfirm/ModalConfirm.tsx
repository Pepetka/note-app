import {MouseEvent, useCallback, useEffect, useRef} from 'react';
import {Button, ButtonThemes} from 'components/lib/Button/Button';
import {Modal} from 'components/Modal/Modal';

import cls from './ModalConfirm.module.scss';

interface ModalConfirmProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export const ModalConfirm = ({isOpen, onClose, onConfirm}: ModalConfirmProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={cls.content}>
				<p>{/* eslint-disable-line */}
					Delete note? Are you sure?
				</p>
				<div className={cls.control}>
					<Button
						theme={ButtonThemes.PRIMARY}
						onClick={onConfirm}
					>{/* eslint-disable-line */}
						Delete
					</Button>
					<Button
						theme={ButtonThemes.PRIMARY}
						onClick={onClose}
					>{/* eslint-disable-line */}
						Close
					</Button>
				</div>
			</div>
		</Modal>
	);
};
