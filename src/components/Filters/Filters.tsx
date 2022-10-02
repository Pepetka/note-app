import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {changeFilter} from 'store/slices/firebaseSlice';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'components/lib/Button/Button';

import cls from './Filters.module.scss';

const buttons = [
	{name: 'Active', data: 'active'},
	{name: 'Important', data: 'isImportant'},
	{name: 'Finished', data: 'isDisable'},
	{name: 'All', data: 'all'},
];

export const Filters = () => {
	const dispatch = useAppDispatch();
	const {filter} = useAppSelector((state) => state.firebase);
	const {t} = useTranslation('home');

	const onChangeFilter = (data: string) => {
		dispatch(changeFilter({filter: data}));
	};

	return (
		<div className={cls.Filter}>
			{buttons.map((el) => {
				return (
					<Button
						key={el.data}
						theme={ButtonThemes.SECONDARY}
						onClick={() => onChangeFilter(el.data)}
						active={filter === el.data}
					>
						{t(el.name)}
					</Button>
				);
			})}
		</div>
	);
};
