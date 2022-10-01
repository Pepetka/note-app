import {useHandleSort} from 'hooks/useHandleSort';

import './HandleSortButton.scss';

export const HandleSortButton = () => {
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<button
			onClick={onHandleSort}
			className='handleSortButton'
		>
			{handleSort ? (
				<i className="fa-solid fa-sort"></i>
			) : (
				<i className="fa-solid fa-shuffle"></i>
			)}
		</button>
	);
};
