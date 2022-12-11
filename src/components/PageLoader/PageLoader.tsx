import {Loader} from 'shared/lib/Loader/Loader';
import {classNames} from 'shared/helpers/classNames/classNames';
import {useTheme} from 'shared/hooks/useTheme';
import {memo} from 'react';
import {HStack} from 'shared/lib/Flex/HStack';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
	className?: string
}
export const PageLoader = memo(({className}: PageLoaderProps) => {
	const {theme} = useTheme();

	return (
		<HStack justify='center' align='center' data-testid='PageLoader' className={classNames([cls.PageLoader, theme, 'PageLoader', className])}>
			<Loader />
		</HStack>
	);
});
