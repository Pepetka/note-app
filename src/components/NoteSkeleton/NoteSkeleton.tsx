import {memo} from 'react';
import {classNames} from 'shared/helpers/classNames/classNames';
import {Skeleton} from 'shared/lib/Skeleton/Skeleton';
import {VStack} from 'shared/lib/Flex/VStack';
import {HStack} from 'shared/lib/Flex/HStack';
import {BrowserView} from 'react-device-detect';

import cls from './NoteSkeleton.module.scss';

interface NoteSkeletonProps {
	className?: string
}

export const NoteSkeleton = memo(
	({className}: NoteSkeletonProps) => {
		return (
			<VStack w100 align='center' className={classNames([cls.NoteSkeleton, className])}>
				<HStack justify='between' className={cls.main}>
					<BrowserView>
						<HStack className={cls.bthGroup}>
							<Skeleton width={30} margin={10} />
							<Skeleton width={30} margin={10} />
						</HStack>
					</BrowserView>
					<VStack gap='8' justify='center' align='center' className={cls.header}>
						<Skeleton width={150} height={16} />
						<Skeleton width={180} height={16} />
					</VStack>
					<BrowserView>
						<HStack justify='end' className={cls.btn}>
							<Skeleton width={30} margin={10} />
						</HStack>
					</BrowserView>
				</HStack>
				<Skeleton width={30} margin={10}/>
			</VStack>
		);
	},
);
