import {Loader} from 'components/Loader/Loader';
import {classNames} from 'helpers/classNames/classNames';
import {useTheme} from 'hooks/useTheme';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
	className?: string
}
export const PageLoader = ({className}: PageLoaderProps) => {
	const {theme} = useTheme();

	return (
		<div className={classNames([cls.PageLoader, theme, 'PageLoader', className])}>
			<Loader/>
		</div>
	);
};
