import {Loader} from 'lib/Loader/Loader';
import {classNames} from 'helpers/classNames/classNames';
import {useTheme} from 'hooks/useTheme';
import {memo} from 'react';
import {HStack} from 'lib/Flex/HStack';

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
