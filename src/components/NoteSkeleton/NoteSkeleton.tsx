import {memo} from 'react';
import {classNames} from 'helpers/classNames/classNames';
import {Skeleton} from 'lib/Skeleton/Skeleton';

import cls from './NoteSkeleton.module.scss';

interface NoteSkeletonProps {
	className?: string
}

export const NoteSkeleton = memo(
	({className}: NoteSkeletonProps) => {
		return (
			<div className={classNames([cls.NoteSkeleton, className])}>
				<div className={cls.main}>
					<div className={cls.bthGroup}>
						<Skeleton width={30} margin={10} />
						<Skeleton width={30} margin={10} />
					</div>
					<div className={cls.header}>
						<Skeleton width={150} height={16} />
						<Skeleton width={180} height={16} />
					</div>
					<div className={cls.btn}>
						<Skeleton width={30} margin={10} />
					</div>
				</div>
				<Skeleton width={30} margin={10}/>
			</div>
		);
	},
);
