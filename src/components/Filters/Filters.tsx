import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {changeFilter} from 'store/slices/firebaseSlice';

const buttons = [
	{name: 'Active', data: 'active'},
	{name: 'Important', data: 'isImportant'},
	{name: 'Finished', data: 'isDisable'},
	{name: 'All', data: 'all'},
];

export const Filters = () => {
	const dispatch = useAppDispatch();
	const {filter} = useAppSelector((state) => state.firebase);

	const onChangeFilter = (data: string) => {
		dispatch(changeFilter({filter: data}));
	};

	return (
		<div className='filter mb-3'>
			{buttons.map((el) => {
				const btnClasses = `btn btn-outline-primary ${filter === el.data ? 'primary-bg primary-text' :
					'secondary-bg secondary-text'}`;

				return (
					<button
						key={el.data}
						type='button'
						className={btnClasses}
						onClick={() => onChangeFilter(el.data)}
					>
						{el.name}
					</button>
				);
			})}
		</div>
	);
};
