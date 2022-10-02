import cls from './Loader.module.scss';

export const Loader = () => {
	return (
		<div className={cls.Loader}>
			<div className={cls.wrapper}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
