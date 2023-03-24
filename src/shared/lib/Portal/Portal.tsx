import {createPortal} from 'react-dom';
import {ReactNode} from 'react';

interface PortalProps {
	/**
	 * Компонент, который необходимо переместить
	 */
	children: ReactNode,
	/**
	 * Контейнер, в который переносится компонент
	 */
	container?: HTMLElement
}
export const Portal = ({children, container = document.body}: PortalProps) => createPortal(children, container);
