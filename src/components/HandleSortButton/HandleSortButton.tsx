import {useHandleSort} from 'shared/hooks/useHandleSort';
import {Button, ButtonThemes} from 'shared/lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort, faShuffle} from '@fortawesome/free-solid-svg-icons';
import {memo} from 'react';

export const HandleSortButton = memo(() => {
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<Button
			onClick={onHandleSort}
			theme={ButtonThemes.CIRCLE}
			data-testid='HandleSortButton'
		>
			{handleSort ? (
				<FontAwesomeIcon icon={faSort} data-testid='HandleSortButton_sort' />
			) : (
				<FontAwesomeIcon icon={faShuffle} data-testid='HandleSortButton_shuffle' />
			)}
		</Button>
	);
});
