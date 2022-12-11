import {createPortal} from 'react-dom';
import {ReactNode} from 'react';

interface PortalProps {
	children: ReactNode,
	container?: HTMLElement
}
export const Portal = ({children, container = document.body}: PortalProps) => createPortal(children, container);
