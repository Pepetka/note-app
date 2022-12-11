import {memo} from 'react';
import {HStack} from 'shared/lib/Flex/HStack';
import cls from './Loader.module.scss';

export const Loader = memo(() => {
	return (
		<HStack justify='center' w100 data-testid='Loader'>
			<div className={cls.wrapper}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</HStack>
	);
});
