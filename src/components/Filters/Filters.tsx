import {notesActions} from 'store/notes/slice/notesSlice';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {getFilter} from 'store/notes/selectors/getFilter/getFilter';
import {useAppDispatch} from 'hooks/useRedux';
import {FilterTypes} from 'store/notes/types/NotesSchema';
import {useSelector} from 'react-redux';
import {memo, useCallback} from 'react';

import cls from './Filters.module.scss';

const buttons: Array<{name: string, data: FilterTypes}> = [
	{name: 'Active', data: FilterTypes.ACTIVE},
	{name: 'Important', data: FilterTypes.IMPORTANT},
	{name: 'Finished', data: FilterTypes.DISABLE},
	{name: 'All', data: FilterTypes.ALL},
];

export const Filters = memo(() => {
	const dispatch = useAppDispatch();
	const filter = useSelector(getFilter);
	const {t} = useTranslation('home');

	const onChangeFilter = useCallback((data: FilterTypes) => () => {
		if (filter === data) {
			dispatch(notesActions.changeFilter({filter: FilterTypes.ALL}));
			return;
		}

		dispatch(notesActions.changeFilter({filter: data}));
	}, [dispatch, filter]);

	return (
		<div className={cls.Filter} data-testid='Filters'>
			{buttons.map(({data, name}) => {
				if (data === FilterTypes.ALL && window.innerWidth <= 768) {
					return null;
				}

				return (
					<Button
						key={data}
						theme={ButtonThemes.SECONDARY}
						onClick={onChangeFilter(data)}
						active={filter === data}
						className={cls.button}
						testid={`Filters_${data}`}
					>
						{t(name)}
					</Button>
				);
			})}
		</div>
	);
});
