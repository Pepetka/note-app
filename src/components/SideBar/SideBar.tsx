import {useState} from 'react';
import {ThemeButton} from 'components/ThemeButton/ThemeButton';
import {LocalizationButton} from 'components/LocalizationButton/LocalizationButton';

import './SideBar.scss';
import {HandleSortButton} from '../HandleSortButton/HandleSortButton';

export const SideBar = () => {
	const [collapsed, setCollapsed] = useState(true);

	const onCollapsed = () => {
		setCollapsed((collapsed) => !collapsed);
	};

	return (
		<div className='sideBar'>
			<div className={`sideBar__button ${collapsed ? 'sideBar__button_collapsed' : ''}`}>
				<ThemeButton />
			</div>

			<div className={`sideBar__button ${collapsed ? 'sideBar__button_collapsed' : ''}`}>
				<LocalizationButton />
			</div>

			<div className={`sideBar__button ${collapsed ? 'sideBar__button_collapsed' : ''}`}>
				<HandleSortButton />
			</div>

			<button
				className={`sideBar__open ${collapsed ? 'sideBar__open_collapsed' : ''}`}
				onClick={onCollapsed}>
				<i className="fa-solid fa-xmark"></i>
			</button>
		</div>
	);
};
