import {useHandleSort} from 'hooks/useHandleSort';
import {Button, ButtonThemes} from 'components/lib/Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort, faShuffle} from '@fortawesome/free-solid-svg-icons';

export const HandleSortButton = () => {
	const {handleSort, onHandleSort} = useHandleSort();

	return (
		<Button
			onClick={onHandleSort}
			theme={ButtonThemes.CIRCLE}
		>
			{handleSort ? (
				<FontAwesomeIcon icon={faSort}/>
			) : (
				<FontAwesomeIcon icon={faShuffle}/>
			)}
		</Button>
	);
};
