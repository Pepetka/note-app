import {useHandleSort} from 'hooks/useHandleSort';
import {Button, ButtonThemes} from 'components/lib/Button/Button';

export const HandleSortButton = () => {
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<Button
			onClick={onHandleSort}
			theme={ButtonThemes.CIRCLE}
		>
			{handleSort ? (
				<i className="fa-solid fa-sort"></i>
			) : (
				<i className="fa-solid fa-shuffle"></i>
			)}
		</Button>
	);
};
