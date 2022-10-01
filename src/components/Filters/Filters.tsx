import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {changeFilter} from 'store/slices/firebaseSlice';
import {useTranslation} from 'react-i18next';

import './Filters.scss';

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
		<div className='filter'>
			{buttons.map((el) => {
				const btnClasses = `button filter__button ${filter === el.data ? 'filter__button_active' :
					''}`;

				return (
					<button
						key={el.data}
						type='button'
						className={btnClasses}
						onClick={() => onChangeFilter(el.data)}
					>
						{t(el.name)}
					</button>
				);
			})}
		</div>
	);
};
