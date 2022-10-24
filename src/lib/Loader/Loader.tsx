import cls from './Loader.module.scss';
import {memo} from 'react';

export const Loader = memo(() => {
	return (
		<div className={cls.Loader} data-testid='Loader'>
			<div className={cls.wrapper}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
});
