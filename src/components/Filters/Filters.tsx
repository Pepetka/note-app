import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {changeFilter} from 'store/slices/firebaseSlice';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'components/lib/Button/Button';
import {FilterTypes} from 'types';

import cls from './Filters.module.scss';

const buttons = [
	{name: 'Active', data: FilterTypes.ACTIVE},
	{name: 'Important', data: FilterTypes.IMPORTANT},
	{name: 'Finished', data: FilterTypes.DISABLE},
	{name: 'All', data: FilterTypes.ALL},
];

export const Filters = () => {
	const dispatch = useAppDispatch();
	const {filter} = useAppSelector((state) => state.firebase);
	const {t} = useTranslation('home');

	const onChangeFilter = (data: string) => {
		if (filter === data) {
			dispatch(changeFilter({filter: FilterTypes.ALL}));
			return;
		}

		dispatch(changeFilter({filter: data}));
	};

	return (
		<div className={cls.Filter}>
			{buttons.map(({data, name}) => {
				if (data === FilterTypes.ALL && window.innerWidth <= 768) {
					return null;
				}

				return (
					<Button
						key={data}
						theme={ButtonThemes.SECONDARY}
						onClick={() => onChangeFilter(data)}
						active={filter === data}
						className={cls.button}
					>
						{t(name)}
					</Button>
				);
			})}
		</div>
	);
};
