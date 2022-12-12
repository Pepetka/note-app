import {ReactNode} from 'react';
import cls from './Page.module.scss';

interface PageProps {
	children: ReactNode
}

export const Page = ({children}: PageProps) => {
	return (
		<main className={cls.Page}>
			<div className={cls.contentWrapper}>
				{children}
			</div>
		</main>
	);
};
